import React, { Component } from "react";
import ToDoListAPI from "../apis/ToDoListAPI";
import { Alert } from "react-bootstrap";

export default class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = { toDoList: [] };
  }

  componentDidMount() {
    ToDoListAPI.getToDoList().then((response) => {
      const toDoList = response.data;
      this.setState({ toDoList });
    });
  }

  markAsCompleted = (id) => {
    console.log("Completed task " + id);
  };

  removeTask = (id) => {
    console.log("------removeTask------");
    console.log(id);
  };

  renderToDoList = () => {
    console.log("-----renderToDoList------");
    return this.state.toDoList.map((task, index) => {
      console.log(task.content);
      const content = task.status ? (
        <span>task.content</span>
      ) : (
        <del>{task.content}</del>
      );
      return (
        <Alert
          key={index}
          variant="success"
          dismissible
          onClick={this.markAsCompleted(task.id)}
          onClose={this.removeTask(task.id)}
        >
          {content}
        </Alert>
      );
    });
  };

  render() {
    return <React.Fragment>{this.renderToDoList()}</React.Fragment>;
  }
}
