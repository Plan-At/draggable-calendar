import { deleteEvent, deleteEventById, getEvents, getIDs, getUserId, newEvent, sleep } from './api.js';
import { div, btn, button, id, type, drag, toast, strong, small, body, extraClass, value, create } from './htmlutilities.js';
import { editButton } from './editevent.js';

// The header of the calendar
const calendar = document.getElementById("top");
// Manage events button, when its clicked it loads the event list in the manage events modal
const but = btn("btn", extraClass("btn-primary"), type("button"), ["data-bs-toggle", "modal"], ["data-bs-target", "#manageEvents"], value("Manage Events"));
but.addEventListener('click', displayEventList);
// Manage events modal
const manage = div("modal", extraClass("fade"), extraClass("needs-validation"), id("manageEvents"), ["data-bs-backdrop", "static"], ["tabindex", -1],
  ["aria-labelledby", "shareEventLabel"], ["aria-hidden", true]);

// Inner HTML for the manage events modal
manage.innerHTML = `
<div class="modal-dialog">
<div class="modal-content">
  <div class="modal-header">
    <h5 class="modal-title" id="shareEventLabel">Delete Event</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="manageEventsClose1"></button>
  </div>
  <div class="modal-body" id="manageEventsBody">
    
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="manageEventsClose2">Exit</button>
  </div>
</div>
</div>
`;

// Adding the manage events modal and button to the calendar
calendar.appendChild(but);
calendar.appendChild(manage);

// The body of the manage events modal, used to show events
var manageEvents = document.getElementById("manageEventsBody");  

// Clears the events shown in the manage events modal and then calls displayEvent on each event in the event list
export function displayEventList() {
  manageEvents.innerHTML = null;
  getIDs(ids=>getEvents(ids.event_id_list, evts=>evts.result.forEach(displayEvent)));
}

// Creates a card for the event and displays the event's info on it
function displayEvent(eventInfo) {
  var node = div("card", id(eventInfo.event_id+"card"))
  var startDate = new Date(eventInfo.start_time.timestamp_int*1000);
  var endDate = new Date(eventInfo.end_time.timestamp_int*1000);
  node.innerHTML = `
    <div class="card-body", id="${eventInfo.event_id}body">
      <h3 class="card-title" id="eventHeader">${eventInfo.display_name}</h3>
      <h6 class="card-title" id="eventDate">
      ${startDate.toLocaleString()+" to "+endDate.toLocaleString()}
      </h6>
      <p class="card-text" id="eventText">${eventInfo.description}</p>
    </div>
  `;
  // Creates an edit button, on click it displays the edit event modal and adds a function that passes the event id to the submit edit button
  const edit = btn("btn", extraClass("btn-primary"), type("button"), value("Edit Event"), id("editEvent2"), ["data-bs-toggle", "modal"], ["data-bs-target", "#editEvent"]);
  edit.addEventListener('click', ()=>document.getElementById("editbutton").onclick = function(){editButton(eventInfo.event_id)});
  // Creates a delete button, on click it uses the server to delete the event and refreshes the manage events modal
  const delt = btn("btn", extraClass("btn-danger"), type("button"), value("Delete Event"), id("delbutton"));
  delt.addEventListener('click', ()=>deleteEventById(eventInfo.event_id));
  delt.addEventListener('click', async ()=>{
    await sleep(500);
    displayEventList();
  });
  // Adds the edit and delete buttons to the card, and then adds the card to the manage events modal
  node.appendChild(edit);
  node.appendChild(delt);
  manageEvents.appendChild(node);
}
