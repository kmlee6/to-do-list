import React, { Component } from "react";
import update from "immutability-helper";
import ToDoListAPI from "../apis/ToDoListAPI";
import TaskForm from "./TaskForm";
import ToDoList from "./ToDoList";

export default class ToDoContainer extends Component {
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
    const { toDoList } = this.state;
    const index = toDoList.findIndex((task) => task.id === id);
    toDoList.splice(index, 1);
    this.setState({ toDoList });
  };

  render() {
    return (
      <React.Fragment>
        <ToDoList
          toDoList={this.state.toDoList}
          markAsCompleted={this.markAsCompleted}
          removeTask={this.removeTask}
        />
        <TaskForm />
      </React.Fragment>
    );
  }
}
