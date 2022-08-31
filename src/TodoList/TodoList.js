import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import { Container } from "../TodoListComponent/Container";
import { ToDoListLightTheme } from "../TodoListThemes/ToDoListLightTheme";
import { ToDoListDarkTheme } from "../TodoListThemes/ToDoListDarkTheme";
import { ToDoListPrimaryTheme } from "../TodoListThemes/ToDoListPrimaryTheme";
import { Dropdown } from "../TodoListComponent/Dropdown";
import { Heading3 } from "../TodoListComponent/Heading";
import { TextField } from "../TodoListComponent/TextField";
import { Button } from "../TodoListComponent/Button";
import { Table, Th, Thead, Tr } from "../TodoListComponent/Table";
import { connect } from "react-redux";
import {
  addTaskAction,
  changeThemeAction,
  delTaskAction,
  doneTaskAction,
  editTaskAction,
  updateTaskAction,
} from "../redux/actions/ToDoListAction";
import { themeManager } from "../TodoListThemes/ThemeManager";

export class TodoList extends Component {
  state = { taskName: "", update: false };

  rederTaskToDo = () => {
    return this.props.taskList
      .filter((item) => !item.done)
      .map((item, index) => {
        let { id, taskName } = item;
        return (
          <Tr key={index.toString() + item.id}>
            <Th style={{ verticalAlign: "middle" }}>{taskName}</Th>
            <Th className="text-right">
              <Button
                onClick={() => {
                  this.handleEditTask({ id });
                }}
                className="ml-2"
              >
                <i className="fa fa-edit"></i>
              </Button>
              <Button
                onClick={() => {
                  this.handleDoneTask({ id });
                }}
                className="ml-2"
              >
                <i className="fa fa-check"></i>
              </Button>
              <Button
                onClick={() => {
                  this.handleDelTask({ id });
                }}
                className="ml-2"
              >
                <i className="fa fa-trash"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };
  renderTaskCompleted = () => {
    return this.props.taskList
      .filter((item) => item.done)
      .map((item, index) => {
        let { id, taskName } = item;
        return (
          <Tr key={index.toString() + item.id}>
            <Th style={{ verticalAlign: "middle" }}>{taskName}</Th>
            <Th className="text-right">
              <Button
                onClick={() => {
                  this.handleDelTask({ id });
                }}
                className="ml-2"
              >
                <i className="fa fa-trash"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };
  renderDropDown = () => {
    return themeManager.map((item, index) => {
      return (
        <option key={index.toString() + item.id} value={item.id}>
          {item.themeName}
        </option>
      );
    });
  };
  handleAddTask = () => {
    let { taskName } = this.state;
    let newTask = {
      id: Date.now(),
      taskName: taskName,
      done: false,
    };
    this.props.addTask(newTask);
  };
  handleChangeTheme = (theme) => {
    this.props.changeTheme(theme);
  };
  handleDoneTask = (taskID) => {
    this.props.doneTask(taskID);
  };
  handleDelTask = (taskID) => {
    this.props.delTask(taskID);
  };
  handleEditTask = (taskID) => {
    // console.log("handleEditTask");
    this.setState(
      {
        update: true,
      },
      () => {
        this.props.editTask(taskID);
      }
    );
  };
  // componentWillReceiveProps(newProps) {
  //   console.log(this.props);
  //   console.log(newProps);
  //   this.setState({
  //     taskName: newProps.taskEdit.taskName,
  //   });
  // }
  // life cycle tĩnh không truy xuất được con trỏ this
  // static getDerivedStateFromProps(newProps, currentState) {
  //   // newProps là props mới, props cũ là this.props (không truy xuất được)
  //   // currentState: ứng với state hiện tại this.state
  // }
  handleUpdateTask = (task) => {
    // console.log("this.props", this.props);
    // console.log("this.state", this.state);
    // console.log("taskID: ", taskID);

    this.setState(
      {
        update: false,
        taskName: "",
      },
      () => {
        this.props.updateTask(task);
      }
    );
  };
  render() {
    return (
      <ThemeProvider theme={this.props.themeToDoList}>
        <Container className="w-50">
          <Dropdown onChange={(e) => this.handleChangeTheme(e.target.value)}>
            {this.renderDropDown()}
          </Dropdown>
          <hr />
          <Heading3>To do list</Heading3>
          <TextField
            value={this.state.taskName}
            onChange={(e) => {
              this.setState({
                taskName: e.target.value,
              });
            }}
            name="taskName"
            label="Task name"
            className="w-50"
          ></TextField>
          <Button
            onClick={() => {
              this.handleAddTask();
            }}
            className="ml-2"
          >
            <i className="fa fa-plus"></i> Add task
          </Button>
          {this.state.update ? (
            <Button
              onClick={() => {
                this.handleUpdateTask(this.state.taskName);
              }}
              className="ml-2"
            >
              <i className="fa fa-upload"></i> Update
            </Button>
          ) : (
            <Button
              disabled
              onClick={() => {
                this.handleUpdateTask(this.state.taskName);
              }}
              className="ml-2"
            >
              <i className="fa fa-upload"></i> Update
            </Button>
          )}
          <hr />
          <Heading3>Task to do</Heading3>
          <Table>
            <Thead>{this.rederTaskToDo()}</Thead>
          </Table>
          <Heading3>Task Completed</Heading3>
          <Table>
            <Thead>{this.renderTaskCompleted()}</Thead>
          </Table>
        </Container>
      </ThemeProvider>
    );
  }
  // componentDidUpdate(prevProps, prevState) {
  //   this.setState({
  //     taskName: this.props.taskEdit.taskName,
  //   });
  // }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.taskEdit.id !== this.props.taskEdit.id) {
      // console.log("prevProps: ", prevProps);
      // console.log("here");
      // console.log("prevState: ", prevState);
      // console.log("this.props", this.props);
      this.setState({
        taskName: this.props.taskEdit.taskName,
      });
    }
  }
}

//rxm
let mapStateToProps = (state) => {
  // lấy dữ liệu về dưới dạng props
  return {
    themeToDoList: state.todoListReducer.themeToDoList,
    taskList: state.todoListReducer.taskList,
    taskEdit: state.todoListReducer.taskEdit,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    addTask: (newTask) => {
      dispatch(addTaskAction(newTask));
    },
    changeTheme: (themeID) => {
      dispatch(changeThemeAction(themeID));
    },
    doneTask: (taskID) => {
      dispatch(doneTaskAction(taskID));
    },
    delTask: (taskID) => {
      dispatch(delTaskAction(taskID));
    },
    editTask: (taskID) => {
      dispatch(editTaskAction(taskID));
    },
    updateTask: (taskID) => {
      dispatch(updateTaskAction(taskID));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
