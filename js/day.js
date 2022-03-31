import {div, btn, id, type, drag, toast, strong, small, body} from './htmlutilities.js';
import { daysSince1970, Date, dayOfWeek } from './timeutlities.js';
import { Event } from './event.js';

export class Day {
    constructor(date, ...ev){
      this.date = date;
      this.events = ev;
    }
    addEvents(...ev){
      this.events.push(...ev);
    }
    getOverview(){
        var toast2 = div("box");
        for(let i = 0; i < this.events.length; i++){
            toast2.appendChild(this.events[i].getOverview());
        }
        return toast2;
    }
  } 
  