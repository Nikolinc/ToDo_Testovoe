import { RootState } from "store";
import {TaskState, TaskAction, TaskActionTypes } from "types/tasks";

const initialState: TaskState = {
  tasks: [{
    id:0,
    title:"first tasks",
    description:"-",
    createdDate:"-",
    timeAtWork:"-",
    expirationDate:"-",
    Priority:"-",
    File:"-",
    CurrentStatus:"-",
    Coments:"-"
  }],
  loading: false,
  error: null,
}

export const reducer = (state = initialState, action:TaskAction):TaskState=>{
  switch(action.type){
    case TaskActionTypes.TASKS_REQUEST:
      return {...state, loading: true}
    case TaskActionTypes.TASKS_SUCCESS: 
      return {...state, loading: false, tasks: action.payload}
    case TaskActionTypes.TASKS_ERROR:
      return {...state, loading: false, error: action.payload}
    default:
      return state
  }
}

export const fecthTasks = () => ({ type: TaskActionTypes.TASKS_REQUEST })

export const TaskSelector = {
  getTask: (state: RootState) => state.task.tasks,
}


export default reducer