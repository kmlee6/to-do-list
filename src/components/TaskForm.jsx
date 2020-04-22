import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

export default class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = { newTask: "" };
  }

  handleNewTaskOnChange = (event) => {
    this.setState({ newTask: event.target.value });
  };

  handleSubmit = () => {
    const { newTask } = this.state;
    const { addTask } = this.props;
    this.setState({ newTask: "" }, () => addTask(newTask));
    // console.log(this.state.newTask);
  };

  render() {
    return (
      <React.Fragment>
        <Form>
          <Form.Group controlId="formContent">
            <Form.Label>What's next?</Form.Label>
            <Form.Control
              type="text"
              value={this.state.newTask}
              onChange={this.handleNewTaskOnChange}
              placeholder="new task...."
            />
          </Form.Group>
          <Button variant="primary" onClick={this.handleSubmit}>
            Submit
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}
