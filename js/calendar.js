import { div, btn, id, type, drag, body, value, text } from './htmlutilities.js'; // Or the extension could be just `.js`
import { Time } from './timeutlities.js';
import { Event } from './event.js';
import { submitButton } from './createevent.js';
import { get, getEvents, getIDs, updateEvent } from './api.js';

const calendar = document.getElementById("calendar");

var e2 = div("row")
var iii = 0;
var jjjj = 0;

const events = new Map();

var grab = null;

for (var i = 0; i < 8; i++) {
    var e3 = div("col", drag(false));

    for (var j = 0; j < 25; j++) {
        if(j == 0){
            e3.appendChild(div("box", text(i)));
        } else if (i == 0) {
            e3.appendChild(div("box", text(new Time(j-1, 0).format())));
            // e3.appendChild(div("box", (new Time(j+1, 0).format()+"--")));
        } else {
            // if(Math.random()<0.03){
            //     var ev = new Event(new Time(j, 0), new Time(j+1+parseInt(Math.random()*8), 0), "Event: "+(iii++), split);
            //     var over = ev.overview;
            //     over.addEventListener('dragstart', dragStart);
            //     over.addEventListener('dragend', dragEnd);
            //     f.appendChild(over);
            //     events.set(f, ev);
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







function boxDown(box) {
    let str = box.id;
    // console.log("box"+(parseInt(str.substring(3))+1));
    return document.getElementById("box"+(parseInt(str.substring(3))+1));
}
export function updateEntries() {
    

    getIDs("1234567890", "aaaaaaaa", json => {
        console.log(json);
        getEvents(json.event_id_list, "aaaaaaaa", json2 => {
            // console.log(JSON.parse(xhr2.responseText).result);
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
                // console.log(iddd);
                var f = document.getElementById(iddd);
                if (events.get(f) != null || f == null) return;
                
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
// alert(new Date(17, 3, 2000).dayOfWeek);

calendar.appendChild(e2);

var submit2 = document.getElementById("createEvent");
submit2.addEventListener('hide.bs.modal', updateEntries);

function dragStart(e) {
    console.log("start");
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

    // get the draggable element
    // alert(draggable.parentElement.id);

    // draggable.parentElement.removeChild(draggable);

    // add it to the drop target


    if (e.target.classList.contains("box")) {
        // console.log(ev.startTime);
        var old = grab.overview.parentNode;
        console.log(old.id);
        console.log(e.target.id.substring(3)-old.id.substring(3));
        grab.timeChange(parseInt(e.target.id.substring(3))-parseInt(old.id.substring(3)));
        // console.log(ev.startTime);
        // draggable.parentElement.removeChild(draggable.parentElement.firstChild);
        events.set(e.target, grab);
        events.delete(old);
        e.target.appendChild(grab.overview);
        updateEvent("1234567890", "aaaaaaaa", grab, ()=>{});
    }



    // display the draggable element
    grab.overview.style.display = 'block';

    grab = null;




    // rowOfGrab = -1;
    // colOfGrab = -1;
    e.target.style.csstext += "background-color:yellow,"
}
