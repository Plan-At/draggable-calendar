import { div, btn, id, type, drag, body, value } from './htmlutilities.js'; // Or the extension could be just `.js`
import { Time } from './timeutlities.js';
import { Day } from './day.js';
import { Event } from './event.js';


const calendar = document.getElementById("calendar");

var e2 = div("row")
var iii = 0;
var jjjj = 0;

const events = new Map();

var grab = null;

for (var i = 0; i < 8; i++) {
    var e3 = div("col", drag(false));

    for (var j = 0; j < 24; j++) {
        var f = div("box", id("box" + i + "" + j));
        if (i == 0) {
            f.appendChild(document.createTextNode(new Time(j, 0).format()));
            // e3.appendChild(div("box", (new Time(j+1, 0).format()+"--")));
        } else {
            // if(Math.random()<0.03){
            //     var ev = new Event(new Time(j, 0), new Time(j+1+parseInt(Math.random()*8), 0), "Event: "+(iii++), split);
            //     var over = ev.overview;
            //     over.addEventListener('dragstart', dragStart);
            //     over.addEventListener('dragend', dragEnd);
            //     f.appendChild(over);
            //     events.set(f, ev);


            // }
            f.addEventListener('dragenter', dragEnter)
            f.addEventListener('dragover', dragOver);
            f.addEventListener('dragleave', dragLeave);
            f.addEventListener('drop', drop);

        }
        e3.appendChild(f);
        e2.appendChild(e3);
    }

}




function eventOn(event, box) {
    var over = event.overview;
    over.addEventListener('dragstart', dragStart);
    over.addEventListener('dragend', dragEnd);
    events.set(box, event);
    return event;
}

function split(event, size) {
    var box = event.overview.parentNode;
    let str = box.id;
    var row = parseInt(str.charAt(3)), col = parseInt(str.substring(4, 6));
    if (document.getElementById("box" + row + (col + event.totalTime() + size - 1)).childElementCount > 0) return;

    event.endTime.add(size, 0);
    event.overview.style.height = event.totalTime() * 50 + "px";

    // if(box.childElementCount > 0) return;
    // // alert(box.id);
    // box.appendChild(eventOn(event.copy(), box).overview);
}

export function updateEntries() {

    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.752628.xyz/v1/private/user/calendar/event/index?person_id=1234567890");

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("pa-token", "aaaaaaaa");

    xhr.onload = () => {
        let json = JSON.parse(xhr.responseText);
        console.log(xhr.responseText);
        var eventArray = json.event_id_list;
        console.log(eventArray);
        eventArray.forEach(i => {
            let xhr2 = new XMLHttpRequest();
            console.log(i);
            xhr2.open("GET", "https://api.752628.xyz/v1/universal/user/calendar/event?event_id=" + parseInt(i));

            xhr2.setRequestHeader("Accept", "application/json");
            xhr2.setRequestHeader("Content-Type", "application/json");
            xhr2.setRequestHeader("pa-token", "aaaaaaaa");

            xhr2.onload = () => {
                console.log(xhr2.responseText);
                let info = JSON.parse(xhr2.responseText);
                var start = new Date(info.start_time.timestamp_int * 1000);
                var end = new Date(info.end_time.timestamp_int * 1000);
                // console.log(end.getHours());
                var ev = new Event(start, end, "Event: " + parseInt(i), split);
                var over = ev.overview;
                over.addEventListener('dragstart', dragStart);
                over.addEventListener('dragend', dragEnd);
                var iddd = "box" + start.getDay() + "" + start.getHours();
                console.log(iddd);
                var f = document.getElementById(iddd);
                f.appendChild(over);
                if (events.get(f) != null) {
                    // alert("bozo");
                } else events.set(f, ev);
            }

            xhr2.send();
        });

    };

    xhr.send();
}
updateEntries();
// alert(new Date(17, 3, 2000).dayOfWeek);

calendar.appendChild(e2);


function dragStart(e) {
    grab = e.target.parentNode;
    // e.preventDefault();
    e.dataTransfer.setData('text', e.target.id);
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
}

function dragEnd(e) {
    e.target.classList.remove('hide');
}



function dragEnter(e) {
    if (e.target.classList.contains("box")) {
        e.target.classList.add('drag-over');
    }

}

function dragOver(e) {
    if (e.target.classList.contains("box") && events.get(grab) != null && e.target.lastChild == null) {
        var box = e.target;
        for (let i = 0; i < events.get(grab).totalTime(); i++) {
            if (box.childElementCount > 0 && box != grab) return;
            else box = boxDown(box);
        }
        e.preventDefault();
    }
}

function dragLeave(e) {
    e.target.classList.remove('drag-over');
}

function boxLeft(box) {
    let str = box.id;
    var row = parseInt(str.charAt(3)), col = parseInt(str.substring(4, 6));
    return document.getElementById("box" + (row - 1) + col);
}
function boxRight(box) {
    let str = box.id;
    var row = parseInt(str.charAt(3)), col = parseInt(str.substring(4, 6));
    return document.getElementById("box" + (row + 1) + col);
}
function boxUp(box) {
    let str = box.id;
    var row = parseInt(str.charAt(3)), col = parseInt(str.substring(4, 6));
    return document.getElementById("box" + row + (col - 1));
}
function boxDown(box) {
    let str = box.id;
    var row = parseInt(str.charAt(3)), col = parseInt(str.substring(4, 6));
    return document.getElementById("box" + row + (col + 1));
}


function drop(e) {
    e.preventDefault();

    e.target.classList.remove('drag-over');

    // get the draggable element
    const id = e.dataTransfer.getData('text');
    const draggable = document.getElementById(id);
    // alert(draggable.parentElement.id);

    // draggable.parentElement.removeChild(draggable);

    // add it to the drop target


    if (e.target.classList.contains("box")) {
        var ev = events.get(grab);
        var over = ev.overview;
        draggable.parentElement.removeChild(draggable.parentElement.lastChild);
        e.target.appendChild(over)
        events.set(e.target, ev);
        events.delete(grab);


    }



    // display the draggable element
    draggable.classList.remove('hide');

    e.dataTransfer.setData('text', "none");
    grab = null;




    // rowOfGrab = -1;
    // colOfGrab = -1;
    e.target.style.csstext += "background-color:yellow,"
}
