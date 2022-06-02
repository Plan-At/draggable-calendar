export function getIDs(user, token, callback) {
    get("https://api.752628.xyz/v2/calendar/event/index", token, callback);
}
export function getEvents(events, token, callback) {
    var url = "https://api.752628.xyz/v2/calendar/event/get?"
    events.forEach(i => url += ("event_id_list=" + parseInt(i) + "&"));
    get(url, token, callback);
}

export function get(url, token, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("pa-token", token);

    if(callback != null) xhr.onload = () => callback(JSON.parse(xhr.responseText));

    xhr.send();
}

export function post(url, token, message, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    // console.log(message);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("pa-token", token);

    if(callback != null) xhr.onload = () => callback(JSON.parse(xhr.responseText));

    xhr.send(message);
}
export function updateEvent(user, token, event, callback){
  post("https://api.752628.xyz/v2/calendar/event/edit?event_id="+event.id, token, eventJSON(user, event.name, "eventDesc", event.startTime.valueOf()/1000, event.endTime.valueOf()/1000), callback);
}
export function newEvent(user, token, eventName, eventDesc, start, end, callback){
    post("https://api.752628.xyz/v2/calendar/event/create", token, eventJSON(user, eventName, eventDesc, start, end), callback);
}

export function deleteEvent(token, event, callback){
  post("https://api.752628.xyz/v2/calendar/event/delete?event_id="+event.id, token, "", callback);
}
export function deleteEventById(token, id, callback){
  post("https://api.752628.xyz/v2/calendar/event/delete?event_id="+id, token, callback);
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