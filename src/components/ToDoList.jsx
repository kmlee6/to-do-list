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

  renderToDoList = () => {
    console.log("-----renderToDoList------");
    return this.state.toDoList.map((task, index) => {
      console.log(task.content);
      return (
        <Alert key={index} variant="success">
          {task.content}
        </Alert>
      );
    });
  };

  render() {
    return <React.Fragment>{this.renderToDoList()}</React.Fragment>;
  }
}
