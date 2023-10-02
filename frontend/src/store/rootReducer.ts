import { combineReducers } from "redux";
import taskReducer from "./tasks/reducer";
import projectReducer from "./project/reducer";

const rootReducer = combineReducers({
  task: taskReducer,
  project: projectReducer,
});

export type AuthState = ReturnType<typeof rootReducer>;

export default rootReducer;
