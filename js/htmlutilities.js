export function create(type, classes, ...attributes){
  return make(type, classes, attributes);
}

function make(type, classes, attributes){
  const div = document.createElement(type);
  if(classes != null) div.classList.add(classes);
  for(let i = 0; i < attributes.length; i++){
    if(attributes[i][0] === "BODY"){
      div.body = attributes[i][1];
    } 
    else if(attributes[i][0] === "CLASS") div.classList.add(attributes[i][1]);

    else div.setAttribute(attributes[i][0], attributes[i][1]);
  }
  return div;
}


export function div(classes, ...attributes){
  return make("div", classes, attributes);
}


export function strong(classes, body2){
  return make("strong", classes, body(body2));
}

export function small(body2){
  return make("small", null, body(body2));
}
export function btn(classes, ...attributes){
  return make("input", classes, attributes);
}

export function toast(...attributes){
  return div("toast", attributes);
}

export function type(s){
  return tag("type", s);
}

export function id(s){
  return tag("id", s);
}
export function value(s){
  return tag("value", s);
}
export function drag(s){
  return tag("draggable", s);
}
export function body(s){
  return tag("BODY", s);
}
export function extraClass(s){
  return tag("CLASS", s);
}
function tag(tag,s){
  return [tag, s];
}

