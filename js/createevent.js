import { newEvent } from './api.js';
import { div, btn, button, id, type, drag, toast, strong, small, body, extraClass, value, create } from './htmlutilities.js';

const calendar = document.getElementById("top");
const but = btn("btn", extraClass("btn-primary"), type("button"), ["data-bs-toggle", "modal"], ["data-bs-target", "#createEvent"], value("Create Event"));

const create2 = div("modal", extraClass("fade"), extraClass("needs-validation"), id("createEvent"), ["data-bs-backdrop", "static"], ["tabindex", -1],
  ["aria-labelledby", "createEventLabel"], ["aria-hidden", true]);
// const dialog = div("modal-dialog");
// const content = div("modal-content");
// const header = div("modal-header");
// const h5 = create("h5", "modal-title", id("createEventLabel"));
// h5.appendChild(document.createTextNode("Create Event"));
// header.appendChild(h5);
// header.appendChild(btn("btn-close", type("button"), ["data-bs-dismiss", "modal"], ["aria-label", "Close"]));
// content.appendChild(header);
// const mbody = div("modal-body");


// dialog.appendChild(content);
// create2.appendChild(dialog);

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
    <button type="button" id="createclose" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
    <button class="btn btn-primary" data-bs-target="#makeReoccuring" data-bs-toggle="modal">Make Reoccuring</button>
    <button type="submit" id="submitbutton" class="btn btn-primary">Submit</button>
  </div>
</div>
</div>
</script>
`;

calendar.appendChild(but);
calendar.appendChild(create2);

var submit2 = document.getElementById("submitbutton");
submit2.addEventListener('click', submitButton);

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

export function submitButton(){
  const eventName = document.getElementById("event-name").value;

  const eventDesc = document.getElementById("event-desc").value;
  newEvent("1234567890", "aaaaaaaa", eventName, eventDesc, timestampStart, timestampEnd, ()=>{});
}

/*
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createEvent">
    Create Event
  </button>
  

  <div class="modal fade needs-validation" id="createEvent" data-bs-backdrop="static" tabindex="-1" aria-labelledby="createEventLabel" aria-hidden="true" novalidate>
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
          <div class="row mb-3">
            <label for="event-days-start" class="col-sm-3 col-form-label">Start Date:</label>
            <div class="col-sm-5">
              <input type="text" class="form-control" id="event-days-start" placeholder="yyyy-mm-dd">
            </div>
          </div>
          <div class="row mb-3">
            <label for="event-time-start" class="col-sm-3 col-form-label">Start Time:</label>
            <div class="col-sm-5">
              <input type="text" class="form-control" id="event-time-start" placeholder="XX:XX">
            </div>
            <div class="col-sm-3">
              <select class="form-select" id="event-time-start-select">
                <option selected>AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
          <div class="row mb-3">
            <label for="event-days-end" class="col-sm-3 col-form-label">End Date:</label>
            <div class="col-sm-5">
              <input type="text" class="form-control" id="event-days-end" placeholder="yyyy-mm-dd">
            </div>
          </div>
          <div class="row mb-3">
            <label for="event-time-end" class="col-sm-3 col-form-label">End Time:</label>
            <div class="col-sm-5">
              <input type="text" class="form-control" id="event-time-end" placeholder="XX:XX">
            </div>
            <div class="col-sm-3">
              <select class="form-select" id="event-time-end-select">
                <option selected>AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
          <div class="mb-3">
            <label for="event-desc" class="col-form-label">Description:</label>
            <textarea class="form-control" id="event-desc"></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button class="btn btn-primary" data-bs-target="#makeReoccuring" data-bs-toggle="modal">Make Reoccuring</button>
        <button type="submit" class="btn btn-primary" onclick="submitButton()">Submit</button>
      </div>
    </div>
  </div>
</div>*/