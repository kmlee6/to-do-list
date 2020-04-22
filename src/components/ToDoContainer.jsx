import React, { Component } from "react";
import update from "immutability-helper";
import ToDoListAPI from "../apis/ToDoListAPI";
import TaskForm from "./TaskForm";
import ToDoList from "./ToDoList";
import { Jumbotron, Container } from "react-bootstrap";

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

  addTask = (content) => {
    console.log(content);
    const { toDoList } = this.state;
    const newTask = { id: toDoList.size, content: content, status: true };
    // const updatedToDoList = toDoList.push(newTask);
    const updatedToDoList = update(toDoList, { $push: [newTask] });
    this.setState({ toDoList: updatedToDoList });
  };

  updateToDoList = (id, updatedTask) => {
    ToDoListAPI.updateToDoTask(id, updatedTask).then((response) => {
      console.log(response);
    });
  };

  markAsCompleted = (id) => {
    const { toDoList } = this.state;
    const index = toDoList.findIndex((task) => task.id === id);
    const updatedToDoList = update(toDoList, {
      [index]: { $merge: { status: !toDoList[index].status } },
    });
    this.setState(
      { toDoList: updatedToDoList },
      this.updateToDoList(id, updatedToDoList[index])
    );
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
        <Jumbotron fluid>
          <Container>
            <TaskForm addTask={this.addTask} />
            <ToDoList
              toDoList={this.state.toDoList}
              markAsCompleted={this.markAsCompleted}
              removeTask={this.removeTask}
            />
          </Container>
        </Jumbotron>
      </React.Fragment>
    );
  }
}
