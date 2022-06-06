export function getIDs(callback) {
    get("https://api.752628.xyz/v2/calendar/event/index", callback);
}
export function getEvents(events, callback) {
    var url = "https://api.752628.xyz/v2/calendar/event/get?"
    events.forEach(i => url += ("event_id_list=" + parseInt(i) + "&"));
    get(url, callback);
}

function xhrWrapper(method, url, message, callback){
  let xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("pa-token", getToken());
  if(callback != null) xhr.onload = () => callback(JSON.parse(xhr.responseText));
  xhr.send(message);
}
export function get(url, callback) {
  xhrWrapper("GET", url, null, callback);
}
export function post(url, message, callback) {
  xhrWrapper("POST", url,  message, callback);
}

export function updateEvent(user, event, callback){
  post("https://api.752628.xyz/v2/calendar/event/edit?event_id="+event.id, eventJSON(user, event.name, event.description, event.startTime.valueOf()/1000, event.endTime.valueOf()/1000), callback);
}
export function newEvent(user, eventName, eventDesc, start, end, callback){
    post("https://api.752628.xyz/v2/calendar/event/create", eventJSON(user, eventName, eventDesc, start, end), callback);
}

export function deleteEvent(event, callback){
  post("https://api.752628.xyz/v2/calendar/event/delete?event_id="+event.id, "", callback);
}
export function deleteEventById(id, callback){
  post("https://api.752628.xyz/v2/calendar/event/delete?event_id="+id, callback);
}

export function eventJSON(user, eventName, eventDesc, start, end){
  return JSON.stringify({
    "access_control_list": [
      {
        "canonical_name": "string",
        "person_id": user,
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
export function getUserId(){
  let id;
  get("https://api.752628.xyz/v2/user/id/get", json => id = json.person_id);
  // return id;
  return "1234567890";
}

export function getToken(){
  //TODO get davids code
  return "aaaaaaaa";
}

