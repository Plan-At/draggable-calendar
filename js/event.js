import { deleteEvent } from './api.js';
import { div, btn, id, type, drag, toast, strong, small, body, extraClass, value, create, text, button } from './htmlutilities.js';
var acum = 1;
export class Event {
  constructor(startTime, endTime, id, name, description) {
    this.startTime = startTime;
    this.endTime = endTime;
    this.id = id;
    this.name = name;
    this.description = description;
    this.overview = this.getOverview();
  }
  timeChange(hours){
    this.startTime.setTime(this.startTime.valueOf()+hours*3600000);
    this.endTime.setTime(this.endTime.valueOf()+hours*3600000);
    console.log(hours);
  }

  totalTime() {
    return ((this.endTime.getHours()+24) - this.startTime.getHours())%24+1;
  }
  getOverview() {
    var toast2 = div("card", extraClass("item"), id(this.name), drag("true"));

    toast2.style.height = this.totalTime() * 50 + "px";
    toast2.style.width = 100+"px";
    toast2.style.marginBottom = -10000+"px";

    var header = div("card-header", text(this.name));
    var closeButton = button("btn-close");
    closeButton.addEventListener('click', ()=>{
      console.log("click");
      this.overview.remove();
      deleteEvent("aaaaaaaa", this);
    });

    header.appendChild(closeButton);
    toast2.appendChild(header);
    var cardbody = div("card-body");
    cardbody.appendChild(create("input", "form-control", type("text"), value(this.description), ["rows", 3]));
    toast2.appendChild(cardbody);

    // var button2 = btn("btn", type("button"), value("down"));

    // button1.addEventListener('click', ()=>this.clickFunction(this, 1));
    // button2.addEventListener('click', ()=>this.clickFunction(this, -1));

    // toast2.appendChild(button1);

    // toast2.appendChild(button2);
    // let dragging = 0,  body = document.body;
    // function clearJSEvents() {
    //   dragging = 0;
    //   body.removeEventListener("mousemove", resize);
    //   body.classList.remove('resizing');
    // }

    // function resize(e) {
    //   // if (e.pageY > 400 || e.pageY < 200) {
    //   //   return;
    //   // }
    //   body.style.setProperty("--bottom-width", e.pageY + 'px');
    // }

    // toast2.onmousedown = function(e) {
    //   e.preventDefault();
    //   dragging = 1;
    //   body.addEventListener('mousemove', resize);
    //   body.classList.add('resizing');
    // };

    // document.onmouseup = function() {
    //   dragging ? clearJSEvents() : '';
    // };
    return toast2;
  }
}
