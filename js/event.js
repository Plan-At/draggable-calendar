import { deleteEvent } from './api.js';
import { div, btn, id, type, drag, toast, strong, small, body, extraClass, value, create, text, button } from './htmlutilities.js';
//class for an event
export class Event {
  constructor(startTime, endTime, id, name, description) {
    this.startTime = startTime;
    this.endTime = endTime;
    this.id = id;
    this.name = name;
    this.description = description;
    this.overview = this.getOverview();
  }
  //modify the time of an event by a certain amount (useful for dragging operations)
  timeChange(hours){
    this.startTime.setTime(this.startTime.valueOf()+hours*3600000);
    this.endTime.setTime(this.endTime.valueOf()+hours*3600000);
    console.log(hours);
  }
  //return int for how many hours in event
  totalTime() {
    return ((this.endTime.getHours()+24) - this.startTime.getHours())%24+1;
  }
  //generate a div for the event
  getOverview() {
    var toast2 = div("card", extraClass("item"), id(this.name), drag("true"));

    toast2.style.height = this.totalTime() * 50 + "px";
    toast2.style.width = 100+"px";
    toast2.style.marginBottom = -10000+"px";

    var header = div("card-header", text(this.name));
    
    //var closeButton = button("btn-close");
    //closeButton.addEventListener('click', ()=>{
    //  console.log("click");
    //  this.overview.remove();
    //  deleteEvent(this);
    //});
    //header.appendChild(closeButton);
    
    toast2.appendChild(header);
    var cardbody = div("card-body");
    cardbody.appendChild(document.createTextNode(this.description));
    toast2.appendChild(cardbody);
    return toast2;
  }
}
