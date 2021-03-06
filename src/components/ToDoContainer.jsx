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

  fetchLatestToDoList = async () => {
    ToDoListAPI.getToDoList().then((response) => {
      const toDoList = response.data;
      this.setState({ toDoList });
    });
  };

  componentDidMount() {
    setInterval(this.fetchLatestToDoList, 5000);
  }

  addToDoTask = (newTask) => {
    ToDoListAPI.addToDOTask(newTask).then((response) => {
      console.log(response);
    });
  };

  addTask = (content) => {
    const { toDoList } = this.state;
    const newTask = { id: toDoList.size, content: content, status: true };
    const updatedToDoList = update(toDoList, { $push: [newTask] });
    this.setState({ toDoList: updatedToDoList }, this.addToDoTask(newTask));
  };

  updateToDoTask = (id, updatedTask) => {
    ToDoListAPI.updateToDoTask(id, updatedTask).then((response) => {
      console.log(response);
    });
  };

  markAsCompleted = (index, id) => {
    const { toDoList } = this.state;
    const updatedToDoList = update(toDoList, {
      [index]: { $merge: { status: !toDoList[index].status } },
    });
    this.setState(
      { toDoList: updatedToDoList },
      this.updateToDoTask(id, updatedToDoList[index])
    );
  };

  removeToDoTask = (id, task) => {
    ToDoListAPI.removeToDOTask(id, task).then((response) => {
      console.log(response);
    });
  };

  removeTask = (index, id) => {
    const { toDoList } = this.state;
    const tasks = toDoList.splice(index, 1);
    this.setState({ toDoList }, this.removeToDoTask(id, tasks[0]));
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
