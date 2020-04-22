import React, { Component } from "react";
import ToDoListAPI from "../apis/ToDoListAPI";
import { Alert } from "react-bootstrap";
import "./ToDoList.css";
import update from "immutability-helper";

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
    const { toDoList } = this.state;
    const index = toDoList.findIndex((task) => task.id === id);
    const updatedToDoList = update(toDoList, {
      [index]: { $merge: { status: !toDoList[index].status } },
    });
    this.setState({ toDoList: updatedToDoList });
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
        <span>{task.content}</span>
      ) : (
        <del>{task.content}</del>
      );
      return (
        <Alert
          key={index}
          variant="success"
          onClick={() => this.markAsCompleted(task.id)}
          onClose={() => this.removeTask(task.id)}
          dismissible
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
