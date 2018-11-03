const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);

    // TODO láta hluti í _items virka
    items.addEventListener("click", finish);
    items.addEventListener("click", deleteItem);
    items.addEventListener("click", edit);
    items.addEventListener("keydown", commit);
  }

  function formHandler(e) {
    e.preventDefault();

    const textarea = document.querySelector('.form__input');

    if(textarea.value.trim() != "")
      add(textarea.value);

    // clear-a texta í form__input
    textarea.value ="";

  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    if(e.target.classList.value === "item__checkbox")
      e.target.parentElement.classList.toggle("item--done")
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    if(e.target.classList.value==="item__text")
        e.target.contentEditable = "true";
    }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    if (e.keyCode === 13 ) // 13 er enter takki
      e.target.contentEditable = "false";
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    // Listi sem hin element fara í
    let li = el("li", "item", null);

    // Checkbox
    let checkbox = el("input", "item__checkbox", null);
    checkbox.setAttribute("type", "checkbox");

    // Texti úr form
    let text = el("span", "item__text", null);
    text.innerHTML = value;

    // Takki
    let button = el("button", "item__button", null);
    button.innerText = "Eyða";

    li.append(checkbox);
    li.append(text);
    li.append(button);
    items.append(li);
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    if(e.target.classList.value==="item__button"){
      e.target.parentElement.remove();
    }
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    let element = document.createElement(type);
    element.classList.add(className);
    return element;
  }


  return {
    init: init
  }
})();
