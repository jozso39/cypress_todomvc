import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./components/App";
import reducer from "./reducers";
import "todomvc-app-css/index.css";

const store = createStore(reducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

//conditional in-browser automation by Jožin
document.onkeyup = function (e) {
  //input task with random number (need to hit enter afterwards)
  if (e.ctrlKey && e.altKey && e.which == 65) {
    const inputField = document.querySelector(
      `input[data-cy="new-todo-input"]`
    );
    inputField.value = `task ${Math.floor(1 + Math.random() * 9)}`;
    inputField.focus();
  }
  //complete random task
  if (e.ctrlKey && e.altKey && e.which == 67) {
    if (document.querySelector(`li[data-cy="todo-item"]`)) {
      const list = document.querySelector(`ul[data-cy="todo-list"]`);
      const randchild = document.querySelectorAll(`li[data-cy="todo-item"]`)[
        Math.floor(Math.random() * list.childElementCount)
      ];
      randchild.querySelector(`input[data-cy="toggle"]`).click();
    }
  }
  //toggle filters
  if (e.ctrlKey && e.altKey && e.which == 70) {
    if (document.querySelectorAll(`li[data-cy="filter"]`)) {
      if (document.querySelector(`a.selected`).innerText === `All`) {
        document.querySelectorAll(`li[data-cy="filter"] > a`)[1].click();
      } else if (document.querySelector(`a.selected`).innerText === `Active`) {
        document.querySelectorAll(`li[data-cy="filter"] > a`)[2].click();
      } else if (
        document.querySelector(`a.selected`).innerText === `Completed`
      ) {
        document.querySelectorAll(`li[data-cy="filter"] > a`)[0].click();
      }
    }
  }
  //press "Clear completed"
  if (e.ctrlKey && e.altKey && e.which == 68) {
    if (document.querySelector(`.clear-completed`)) {
      document.querySelector(`.clear-completed`).click();
    }
  }
  //press complete all arrow
  if (e.ctrlKey && e.altKey && e.which == 81) {
    if (document.querySelector(`label[data-cy="toggle-all-label"]`)) {
      document.querySelector(`label[data-cy="toggle-all-label"]`).click();
    }
  }
  if (e.ctrlKey && e.altKey && e.which == 113) {
    alert(`KEYBOARD SHORTCUTS\n
    ctrl+alt+A - input new item (need to press enter afterwards to add it)\n
    ctrl+alt+C - complete random item on the list\n
    ctrl+alt+F - toggle filters\n
    ctrl+alt+Q - complete/un-complete all tasks\n
    ctrl+alt+D - clear completed tasks`);
  }
};
