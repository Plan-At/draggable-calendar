import { newEvent, getUserId } from './api.js';
import { div, btn, button, id, type, drag, toast, strong, small, body, extraClass, value, create } from './htmlutilities.js';

// The header of the calendar
const calendar = document.getElementById("top");
// The create event button
const but = btn("btn", extraClass("btn-primary"), type("button"), ["data-bs-toggle", "modal"], ["data-bs-target", "#createEvent"], value("Create Event"));

// The create event modal
const create2 = div("modal", extraClass("fade"), extraClass("needs-validation"), id("createEvent"), ["data-bs-backdrop", "static"], ["tabindex", -1],
  ["aria-labelledby", "createEventLabel"], ["aria-hidden", true]);

// Inner HTML for the create event modal
create2.innerHTML = `
<div class="modal-dialog">
<div class="modal-content">
  <div class="modal-header">
    <h5 class="modal-title" id="createEventLabel">New Event</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body">
    <form>
      <div class="mb-3">
        <label for="event-name" class="col-form-label">Title:</label>
        <input type="text" class="form-control" id="event-name" required>
      </div>
      <div><input type="text" id="datetimerange-input1" size="40" style="text-align:center"></div>
      <div class="mb-3">
        <label for="event-desc" class="col-form-label">Description:</label>
        <textarea class="form-control" id="event-desc"></textarea>
      </div>
    </form>
  </div>
  <div class="modal-footer">
    <button type="button" id="createclose" class="btn btn-secondary" data-bs-dismiss="modal">Back</button>
    <button type="submit" id="submitbutton" class="btn btn-primary">Submit</button>
  </div>
</div>
</div>
</script>
`;

// Adding the create event button and modal to the calendar
calendar.appendChild(but);
calendar.appendChild(create2);

// When the submit button in the create event modal is clicked it runs the submitButton function
var submit2 = document.getElementById("submitbutton");
submit2.addEventListener('click', submitButton);

// Creates and shows a date range picker in the create event modal and saves the timestamps when the user submits dates
var timestampStart, timestampEnd;
window.addEventListener("load", function (event) {
  let drp = new DateRangePicker('datetimerange-input1',
    {
      //startDate: '2000-01-01',
      //endDate: '2000-01-03',
      //minDate: '2021-07-15 15:00',
      //maxDate: '2021-08-16 15:00',
      //maxSpan: { "days": 9 },
      //showDropdowns: true,
      //minYear: 2020,
      //maxYear: 2022,
      //showWeekNumbers: true,
      //showISOWeekNumbers: true,
      timePicker: true,
      //timePickerIncrement: 10,
      //timePicker24Hour: true,
      //timePickerSeconds: true,
      //showCustomRangeLabel: false,
      alwaysShowCalendars: true,
      //opens: 'center',
      //drops: 'up',
      //singleDatePicker: true,
      //autoApply: true,
      //linkedCalendars: false,
      //isInvalidDate: function(m){
      //    return m.weekday() == 3;
      //},
      //isCustomDate: function(m){
      //    return "weekday-" + m.weekday();
      //},
      //autoUpdateInput: false,
      ranges: {
        'Today': [moment().startOf('day'), moment().endOf('day')],
        'Yesterday': [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
        'Last 7 Days': [moment().subtract(6, 'days').startOf('day'), moment().endOf('day')],
        'This Month': [moment().startOf('month').startOf('day'), moment().endOf('month').endOf('day')],
      },
      locale: {
        format: "YYYY-MM-DD HH:mm:ss",
      }
    },
    function (start, end) {
      // alert(start.format() + " - " + end.format());
    })
  //drp.setStartDate('2014/03/01');
  //drp.setEndDate('2014/03/03');
  window.addEventListener('apply.daterangepicker', function (ev) {
    console.log(ev.detail.startDate.unix());
    console.log(ev.detail.endDate.unix());
    timestampStart = ev.detail.startDate.unix();
    timestampEnd = ev.detail.endDate.unix();
  });
});

// Gets the user's id
const user = await getUserId();

// Gets the event name, event description, timestamp start, and timestamp end from the modal and creates a new event
export function submitButton() {
  const eventName = document.getElementById("event-name").value;
  const eventDesc = document.getElementById("event-desc").value;

  newEvent(user, eventName, eventDesc, timestampStart, timestampEnd, () => { });
}