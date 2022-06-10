//get all event ids, then run the callback
export function getIDs(callback) {
    get("https://api.752628.xyz/v2/calendar/event/index", callback);
}
//get the events from an array of IDs, then run the callback
export function getEvents(events, callback) {
    var url = "https://api.752628.xyz/v2/calendar/event/get?"
    events.forEach(i => url += ("event_id_list=" + parseInt(i) + "&"));
    console.log(url);
    get(url, callback);
}
// internal function to handle xhr requests
function xhrWrapper(method, url, message, callback){
  let xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("pa-token", getToken());
  if(callback != null) xhr.onload = () => callback(JSON.parse(xhr.responseText));
  console.log(message);
  xhr.send(message);

}

//get requests
export function get(url, callback) {
  xhrWrapper("GET", url, null, callback);
}
//post requests
export function post(url, message, callback) {
  xhrWrapper("POST", url,  message, callback);
}

//update existing event from the event object
export function updateEvent(user, event, callback){
  post("https://api.752628.xyz/v2/calendar/event/edit?event_id="+event.id, eventJSON(user, event.name, event.description, event.startTime.valueOf()/1000, event.endTime.valueOf()/1000), callback);
}
// Edits an already existing event with new information
export function editEvent(user, eventId, eventName, eventDesc, start, end, callback){
  post("https://api.752628.xyz/v2/calendar/event/edit?event_id="+eventId, eventJSON(user, eventName, eventDesc, start, end), callback);
}
//create a new event
export function newEvent(user, eventName, eventDesc, start, end, callback){
    post("https://api.752628.xyz/v2/calendar/event/create", eventJSON(user, eventName, eventDesc, start, end), callback);
}
//delete an event
export function deleteEvent(event, callback){
  post("https://api.752628.xyz/v2/calendar/event/delete?event_id="+event.id, "", callback);
}

//delete an event by an ID
export function deleteEventById(id, callback){
  post("https://api.752628.xyz/v2/calendar/event/delete?event_id="+id, callback);
}

//generate json for an event
export function eventJSON(user, eventName, eventDesc, start, end){
  return JSON.stringify({
    "access_control_list": [
      {
        "canonical_name": "public",
        "person_id": user+"",
        "permission_list": [
          "read_full",
          "edit_full",
          "delete"
        ]
      }
    ],
    "display_name": eventName,
    "description": eventDesc,
    "start_time": {
      "text": "string",
      "timestamp_int": start,
      "timezone_name": "string",
      "timezone_offset": 0
    },
    "end_time": {
      "text": "string",
      "timestamp_int": end,
      "timezone_name": "string",
      "timezone_offset": 0
    },
    "type_list": [
      {
        "type_id": "string",
        "display_name": "string"
      }
    ],
    "tag_list": [
      {
        "tag_id": "string",
        "display_name": "string"
      }
    ]
  });
}
//user id stuff
var userId;
//get the user id from a token
export async function getUserId(){
  if(userId == null){
    get("https://api.752628.xyz/v2/user/id/get", json => userId = json.person_id);
    await sleep(500);
  }
  console.log(userId);
  return userId;
    // return "1234567890";  
}
//token stuff
export function getToken(){
  //TODO get davids code
  return "aaaaaaaa";
}

//sleep for ms
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}