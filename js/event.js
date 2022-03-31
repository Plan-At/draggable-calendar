import {div, btn, id, type, drag, toast, strong, small, body, extraClass, value} from './htmlutilities.js';
import { Time } from './timeutlities.js';

export class Event {
    constructor(time, content){
      this.time = time;
      this.content = content;
    }
    getOverview(){
      var toast2 = div("item", id("drag"+Math.random()*1000), drag("true"));
      var pop = btn("btn", type("button"), extraClass("btn-primary"),  ["data-bs-toggle", "popover"],["data-bs-trigger","focus"], ["title", this.time.format()], ["data-bs-content", this.content], value(this.content));
      // <button type="button" class="btn" data-bs-toggle="popover" data-bs-trigger="focus" title="Popover title" data-bs-content="And here's some amazing content. It's very engaging. Right?">Click to toggle popover</button>
      toast2.appendChild(pop);
      // toast2.appendChild(document.createTextNode(this.content));
      // var header = div("toast-header");
      // header.appendChild(strong("me-auto", this.time.format()));
      // header.appendChild(small("11 mins ago"));
      // toast2.appendChild(header);
      // toast2.appendChild(div("toast-body", body("hello world")));
      return toast2;
    }
  } 
  