import { combineReducers } from "redux";

import taskReducer from "./taskReducer/taskReducer";

export default combineReducers({
  task: taskReducer,
});
