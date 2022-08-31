import { combineReducers } from "redux";
import { todoListReducer } from "./ToDoListReducer";

export const rootReducer = combineReducers({
  todoListReducer: todoListReducer,
});
