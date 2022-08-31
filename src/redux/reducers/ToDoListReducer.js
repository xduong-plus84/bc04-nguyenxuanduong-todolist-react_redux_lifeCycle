import { themeManager } from "../../TodoListThemes/ThemeManager";
import { ToDoListDarkTheme } from "../../TodoListThemes/ToDoListDarkTheme";
import {
  ADD_TASK,
  CHANGE_THEME,
  DEL_TASK,
  DONE_TASK,
  EDIT_TASK,
  UPDATE_TASK,
} from "../constant/ToDoList";

const initialState = {
  themeToDoList: ToDoListDarkTheme,
  taskList: [
    { id: 1, taskName: "task1", done: true },
    { id: 2, taskName: "task2", done: false },
    { id: 3, taskName: "task3", done: true },
    { id: 4, taskName: "task4", done: false },
  ],
  taskEdit: { id: 1, taskName: "task1", done: true },
};

export let todoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK: {
      if (action.payload.taskName.trim() === "") {
        alert("Task name is required");
        return { ...state };
      }
      let taskListUpdate = [...state.taskList];
      let index = taskListUpdate.findIndex(
        (task) => task.taskName === action.payload.taskName
      );
      if (index !== -1) {
        alert("Task name is already exists");
        return { ...state };
      }
      state.taskList = [...taskListUpdate, action.payload];
      return { ...state };
    }
    case CHANGE_THEME: {
      let item = themeManager.find((item) => item.id == action.payload);
      if (item) {
        state.themeToDoList = item.theme;
      }
      return { ...state };
    }
    case DONE_TASK: {
      console.log(action.payload);
      let taskListUpdate = [...state.taskList];
      let index = taskListUpdate.findIndex((item) => item.id == action.payload);
      taskListUpdate[index].done = true;

      //   state.taskList = taskListUpdate;
      return { ...state, taskList: taskListUpdate };
    }
    case DEL_TASK: {
      return {
        ...state,
        taskList: state.taskList.filter((item) => item.id != action.payload),
      };
    }
    case EDIT_TASK: {
      // console.log(action.payload);
      let item = state.taskList.find((item) => item.id == action.payload);
      let taskEditUpdate = item;
      // console.log("taskEditUpdate: ", taskEditUpdate);
      state.taskEdit = taskEditUpdate;
      // console.log(state.taskEdit);
      return { ...state };
    }
    case UPDATE_TASK: {
      // console.log(action.payload);

      let taskListUpdate = [...state.taskList];

      let index = taskListUpdate.findIndex(
        (item) => item.id == state.taskEdit.id
      );

      // console.log("index: ", index);
      // console.log("taskListUpdate: ", taskListUpdate);

      taskListUpdate[index].taskName = action.payload;
      state.taskEdit = { id: action.payload, taskName: "", done: false };

      return { ...state, taskList: taskListUpdate };
      // return { ...state };
    }
    default:
      return { ...state };
  }
};
