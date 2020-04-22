import React, { Component } from "react";
import TaskForm from "./TaskForm";
import ToDoList from "./ToDoList";

export default class ToDoContainer extends Component {
  render() {
    return (
      <React.Fragment>
        <ToDoList />
        <TaskForm />
      </React.Fragment>
    );
  }
}
