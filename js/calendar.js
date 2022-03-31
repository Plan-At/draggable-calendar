import {div, btn, id, type, drag} from './htmlutilities.js'; // Or the extension could be just `.js`
import { Date, Time } from './timeutlities.js';
import { Day } from './day.js';
import { Event } from './event.js';


const calendar = document.getElementById("calendar");

var e2 = div("row")
var iii = 0;

for (var i = 1; i <8 ; i++) {
    var e3 = div("col");
    for(var j = 0; j< 5; j++){
        e3.appendChild(getDay(j*7+i));
        e2.appendChild(e3);
    }
}
// alert(new Date(17, 3, 2000).dayOfWeek);

calendar.appendChild(e2);
function getDay(num){
    var d = new Day(new Date(num, 3, 2022));
    for(let i = 0; i < Math.random()*3-0.5; i++){
        var e = new Event(new Time(i+1, 0), "Event: "+iii++);
        d.addEvents(e);
    }
    return d.getOverview();
    // return addEvents(div("box"), num);
}
function addEvents(day, num){
    //api stuff i think
    for(let i = 0; i < Math.random()*3-0.5; i++){
        var e = div("item", id("drag"+num+i), drag("true"));
        var pop = btn("btn", type("button"), ["data-bs-toggle", "popover"],["data-bs-trigger","focus"], ["title","Popover title"], ["data-bs-content","day: "+num+", event: "+i]);
        // <button type="button" class="btn" data-bs-toggle="popover" data-bs-trigger="focus" title="Popover title" data-bs-content="And here's some amazing content. It's very engaging. Right?">Click to toggle popover</button>
        e.appendChild(pop);
        day.appendChild(e);
    }
    return day;
}
