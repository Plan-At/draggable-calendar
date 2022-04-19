import {div, btn, id, type, drag, body, value} from './htmlutilities.js'; // Or the extension could be just `.js`
import { Date, Time } from './timeutlities.js';
import { Day } from './day.js';
import { Event } from './event.js';


const calendar = document.getElementById("calendar");

var e2 = div("row")
var iii = 0;
var jjjj = 0;

// const events =  new Array(7).fill(new Array(24))

for (var i = 0; i <4 ; i++) {
    var e3 = div("col");
    for(var j = 0; j < 4; j++){
        var f = div("box", id("box"+jjjj++));
        if(i == 0){
            f.appendChild(document.createTextNode(new Time(j, 0).format()));
            // e3.appendChild(div("box", (new Time(j+1, 0).format()+"--")));
        }else{
            if(Math.random()<0.1){
                var ev = new Event(new Time(j, 0), "Event: "+iii++);
                var over = ev.getOverview()
                over.addEventListener('dragstart', dragStart);
                over.addEventListener('dragend', dragEnd);
                f.appendChild(over);

            }
            f.addEventListener('dragenter', dragEnter)
            f.addEventListener('dragover', dragOver);
            f.addEventListener('dragleave', dragLeave);
            f.addEventListener('drop', drop);
        }
        e3.appendChild(f);
        e2.appendChild(e3);
    }
}


// alert(new Date(17, 3, 2000).dayOfWeek);

calendar.appendChild(e2);


function dragStart(e) {
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
    // e.preventDefault();
    e.target.classList.add('drag-over');

}

function dragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragLeave(e) {
    e.target.classList.remove('drag-over');
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
    e.target.appendChild(draggable);


    // display the draggable element
    draggable.classList.remove('hide');

    e.dataTransfer.clearData();


    // var row = e.target.id.charAt(0);
    // var col = e.target.id.charAt(1);
    // events[row][col] = events[rowOfGrab][colOfGrab];
    // events[rowOfGrab][colOfGrab] = null;

    // // alert(c);
    // if(colOfGrab > 0 && events[rowOfGrab][colOfGrab-1] != null){
    //     alert("eee");
    // }

    // events[rowOfGrab][colOfGrab] = null;

    // // rowOfGrab = -1;
    // // colOfGrab = -1;
    // e.target.style.csstext+="background-color:yellow,"
}
