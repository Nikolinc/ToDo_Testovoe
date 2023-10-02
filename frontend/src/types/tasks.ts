export interface Task{
  id:number,
  title:string,
  description:string,
  createdDate:string,
  timeAtWork:string,
  expirationDate:string,
  Priority:string,
  File:string,
  CurrentStatus:string,
  Coments:string
}

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: null | string;
}

export enum TaskActionTypes {
  TASKS_REQUEST = 'TASKS_REQUEST',
  TASKS_SUCCESS= 'TASKS_SUCCESS',
  TASKS_ERROR= 'TASKS_ERROR',
  SET_TASKS_REQUEST = 'SET_TASKS_REQUEST',
  SET_TASKS_SUCCESS = 'SET_TASKS_SUCCESS',
  SET_TASKS_ERROR = 'SET_TASKS_ERROR',
}

interface TaskRequestAction {
  type: TaskActionTypes.TASKS_REQUEST
}

interface TaskSuccessAction {
  type: TaskActionTypes.TASKS_SUCCESS;
  payload: Task[];
}

interface TaskErrorAction {
  type: TaskActionTypes.TASKS_ERROR;
  payload:string;
}

export interface TaskSuccessPayLoad{
  task:Task[]
}

export interface TaskFailurePayload {
  error:string
}

export type TaskSuccess = {
  type:typeof TaskActionTypes.TASKS_SUCCESS,
  payload:TaskSuccessPayLoad,
}

export type TaskFailure = {
  type:typeof TaskActionTypes.TASKS_ERROR,
  payload:TaskFailurePayload,
}

export type TaskAction =
      TaskRequestAction
    | TaskSuccessAction
    | TaskErrorAction
