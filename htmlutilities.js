export function create(type, classes, ...attributes){
  return make(type, classes, attributes);
}

function make(type, classes, attributes){
  const div = document.createElement(type);
  div.classList.add(classes);
  for(let i = 0; i < attributes.length; i++){
    div.setAttribute(attributes[i][0], attributes[i][1]);
  }
  return div;
}


export function div(classes, ...attributes){
  return make("div", classes, attributes);
}
export function btn(classes, ...attributes){
  return make("button", classes, attributes);
}
