import {
  ADD_TASK,
  CHANGE_THEME,
  DEL_TASK,
  DONE_TASK,
  EDIT_TASK,
  UPDATE_TASK,
} from "../constant/ToDoList";

export const addTaskAction = (newTask) => ({
  type: ADD_TASK,
  payload: newTask,
});

export const changeThemeAction = (themeID) => ({
  type: CHANGE_THEME,
  payload: themeID,
});

export const doneTaskAction = (taskID) => ({
  type: DONE_TASK,
  payload: taskID.id,
});

export const delTaskAction = (taskID) => ({
  type: DEL_TASK,
  payload: taskID.id,
});

export const editTaskAction = (taskID) => ({
  type: EDIT_TASK,
  payload: taskID.id,
});

export const updateTaskAction = (taskName) => ({
  type: UPDATE_TASK,
  payload: taskName,
});
