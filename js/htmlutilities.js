//base function to create a html element
export function create(type, classes, ...attributes){
  return make(type, classes, attributes);
}

//internal 
function make(type, classes, attributes){
  const div = document.createElement(type);
  if(classes != null) div.classList.add(classes);
  for(let i = 0; i < attributes.length; i++){
    if(attributes[i][0] === "BODY"){
      div.body = attributes[i][1];
    } else if(attributes[i][0] === "TEXT"){
      div.appendChild(document.createTextNode(attributes[i][1]));
    } 
    else if(attributes[i][0] === "CLASS") {
      for(let c of attributes[i][1]){
        div.classList.add(c);
      }
    }

    else div.setAttribute(attributes[i][0], attributes[i][1]);
  }
  return div;
}

//make a div
export function div(classes, ...attributes){
  return make("div", classes, attributes);
}

// make strong text
export function strong(classes, body2){
  return make("strong", classes, body(body2));
}

// make small text
export function small(body2){
  return make("small", null, body(body2));
}
//make an input
export function btn(classes, ...attributes){
  return make("input", classes, attributes);
}
//make a button
export function button(classes, ...attributes){
  return make("button", classes, attributes);
}
//make a toast
export function toast(...attributes){
  return div("toast", attributes);
}

//create dummy tag to add a type to a created element
export function type(s){
  return tag("type", s);
}

//create an id dummy tag
export function id(s){
  return tag("id", s);
}
//create dummy tag for value
export function value(s){
  return tag("value", s);
}
//set draggable attribute
export function drag(s){
  return tag("draggable", s);
}
//set the body of element
export function body(s){
  return tag("BODY", s);
}
//add extra classes to element
export function extraClass(...s){
  return ["CLASS", s];
}
//internal function for dummy tags
function tag(tag, s){
  return [tag, s];
}
//set the text for a dummy element
export function text(s){
  return tag("TEXT", s);
}
//letroll >:)
String.prototype.replaceAt = function (index, char) {
  let a = this.split("");
  a[index] = char;
  return a.join("");
}