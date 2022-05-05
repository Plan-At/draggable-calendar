import {div, btn, id, type, drag, toast, strong, small, body, extraClass, value} from './htmlutilities.js';
var acum = 1;
export class Event {
    constructor(startTime, endTime, content, click){
      this.startTime = startTime;
      this.endTime = endTime;
      this.content = content;
      this.clickFunction = click;
      this.overview = this.getOverview();
    }
    

    totalTime(){
      return (this.endTime.getHours()-this.startTime.getHours());
    }
    getOverview(){
      var toast2 = div("item", id("drag"+acum++), drag("true"));

      toast2.style.height = this.totalTime()*50+"px";
      var button1 = div("dragger", drag("true"));
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
    copy(){
      return new Event(this.startTime, this.endTime, this.content, this.clickFunction);
    }
  } 
  