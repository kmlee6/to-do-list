import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import "./ToDoList.css";

export default class ToDoList extends Component {
  renderToDoList = () => {
    const { toDoList, removeTask, markAsCompleted } = this.props;

    return toDoList.map((task, index) => {
      const isDone = task.status ? "done" : "pending";
      const content = task.status ? (
        <span>{task.content}</span>
      ) : (
        <del>{task.content}</del>
      );
      return (
        <Alert
          key={index}
          variant="success"
          onClose={() => removeTask(index, task.id)}
          dismissible
        >
          <span onClick={() => markAsCompleted(index, task.id)}>{content}</span>
        </Alert>
      );
    });
  };

  render() {
    return <React.Fragment>{this.renderToDoList()}</React.Fragment>;
  }
}
