import { div, btn, id, type, drag, body, value, text, extraClass } from './htmlutilities.js'; // Or the extension could be just `.js`
import { Time } from './timeutilities.js';
import { Event } from './event.js';
import './createevent.js';
import './manageevent.js';
import { getEvents, getIDs, getUserId, updateEvent } from './api.js';

//root calendar class that manages everything

//make draggables work
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})


//root div 
const calendar = document.getElementById("calendar");

var e2 = div("row");

const events = new Map();
//strings for days of week
const daysOfWeek = ['Sunday', 'Monday','Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//variable for the currently grabbed element
var grab = null;
//get the user id
var user = await getUserId();

for (var i = 0; i < 8; i++) {
    var e3 = div("col", drag(false));

    for (var j = 0; j < 25; j++) {
        if(j == 0 && i != 0){
            e3.appendChild(div("box", extraClass("boxTop",(i-1)==new Date().getDay() ? "now" : "notNow"), id((i-1)==new Date().getDay() ? "dated" : ""), text(daysOfWeek[i-1])));
        } else if (i == 0 && j != 0) {
            e3.appendChild(div("box", text(new Time(j-1, 0).format())));
        } else {
 
            var f = div("box", id("box"+(24*(i-1)+j-1)));


            // }
            f.addEventListener('dragenter', dragEnter)
            f.addEventListener('dragover', dragOver);
            f.addEventListener('dragleave', dragLeave);
            f.addEventListener('drop', drop);
            e3.appendChild(f);
        }
        e2.appendChild(e3);
    }

}



const wkNow = parseInt((Date.now()/(1000*60*60*24)+10)/7);
var week = wkNow;
document.getElementById("myweek").value = (1970+parseInt(week/(365.25/7))+"-W"+parseInt(week%(365.25/7)));

//used to recursivley 
function boxDown(box) {
    let str = box.id;
    return document.getElementById("box"+(parseInt(str.substring(3))+1));
}
//update the displayed calendar to the proper events
export function updateEntries() {
    events.forEach((ev, dv)=>dv.firstChild.remove());
    events.clear();
    //callback hell AAAAAAAAAAAAAAAAAAA
    getIDs(json => {
        console.log(json);
        getEvents(json.event_id_list, json2 => {
            console.log(json2);
            json2.result.forEach(info => {
                // console.log(info);
                for (let v of events.values()) {
                    // console.log(v.content + "  " + info.event_id);
                    if (v.id == info.event_id) {
                        // console.log("match");
                        return;
                    }
                }

                var start = new Date(info.start_time.timestamp_int * 1000);
                var end = new Date(info.end_time.timestamp_int * 1000);
                var iddd = "box" + parseInt(start.getHours()+start.getDay()*24);
                console.log(iddd);
                var f = document.getElementById(iddd);
                console.log(parseInt((start.getTime()/(1000*60*60*24)+11)/7));
                if (events.get(f) != null || f == null || parseInt((start.getTime()/(1000*60*60*24)+11)/7) != parseInt(week)) return;
                
                
                // console.log(end.getHours());
                var ev = new Event(start, end, info.event_id, info.display_name, info.description);
                var over = ev.overview;
                over.addEventListener('dragstart', dragStart);
                over.addEventListener('dragend', dragEnd);
                // console.log(over.id);
                f.appendChild(over);
                events.set(f, ev);
            });
        });
    });
}

updateEntries();

calendar.appendChild(e2);

var submit2 = document.getElementById("createEvent");
submit2.addEventListener('hide.bs.modal', updateEntries);


var weekSelector = document.getElementById("myweek");
weekSelector.addEventListener('input', ()=>{
    var year = parseInt(weekSelector.value.substring(0, 4));
    var wk = parseInt(weekSelector.value.substring(6));
    week = (year-1970)*(365.25/7)+wk+0.8;
    console.log(week);
    if(wkNow == parseInt(week)) document.getElementById("dated").classList.replace("notNow", "now");
    else document.getElementById("dated").classList.replace("now", "notNow");
    updateEntries();
})
function dragStart(e) {
    grab = events.get(e.target.parentNode);
    // e.preventDefault();
    // e.dataTransfer.setData('text', e.target.id);
    setTimeout(()=> e.target.style.display = 'none', 9);
}

function dragEnd(e) {
    e.target.style.display = 'block';
}



function dragEnter(e) {
    if (e.target.classList.contains("box")) {
        e.target.classList.add('drag-over');
    }

}

function dragOver(e) {
    if (e.target.classList.contains("box") && grab != null) {
        // console.log(events.get(grab).totalTime());
        var box = e.target;
        for (let i = 0; i < grab.totalTime(); i++) {
            if (box == null ||( box.childElementCount > 0 && box != grab.parentNode)) return;
            else box = boxDown(box);
        }
        
        e.preventDefault();
    }
}

function dragLeave(e) {
    e.target.classList.remove('drag-over');
}

function drop(e) {
    e.preventDefault();

    e.target.classList.remove('drag-over');


    if (e.target.classList.contains("box")) {
        // console.log(ev.startTime);
        var old = grab.overview.parentNode;
        grab.timeChange(parseInt(e.target.id.substring(3))-parseInt(old.id.substring(3)));
        // console.log(ev.startTime);
        // draggable.parentElement.removeChild(draggable.parentElement.firstChild);
        events.set(e.target, grab);
        events.delete(old);
        e.target.appendChild(grab.overview);
        updateEvent(user, grab, ()=>{});
    }


//reset
    grab = null;

}
