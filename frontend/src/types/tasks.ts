export interface Task {
  _id: string;
  title: string;
  description: string;
  createDate: string;
  timeAtWork: string;
  expirationDate: string;
  priority: Priority;
  file: string;
  currentStatus: Status;
  coments: string;
  project: string;
}

export enum Priority {
  Critical = "Critical",
  High = "High",
  Medium = "Medium",
  Low = "Low",
}

export enum Status {
  Queue = "Queue",
  Development = "Development",
  Done = "Done",
}

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: null | string;
}

export enum TaskActionTypes {
  TASKS_REQUEST = "TASKS_REQUEST",
  TASKS_SUCCESS = "TASKS_SUCCESS",
  TASKS_ERROR = "TASKS_ERROR",
  SET_TASKS_REQUEST = "SET_TASKS_REQUEST",
  TASKS_UPLOAD = "TASKS_UPLOAD",
}

interface TaskRequestAction {
  type: TaskActionTypes.TASKS_REQUEST;
}

interface TaskUploadAction {
  type: TaskActionTypes.TASKS_UPLOAD;
}

interface TaskSuccessAction {
  type: TaskActionTypes.TASKS_SUCCESS;
  payload: Task[];
}

interface TaskErrorAction {
  type: TaskActionTypes.TASKS_ERROR;
  payload: string;
}

export interface TaskSuccessPayLoad {
  task: Task[];
}

export interface TaskFailurePayload {
  error: string;
}

export interface TaskRequest {
  type: typeof TaskActionTypes.TASKS_REQUEST;
  payload: { id: string };
}

export interface TaskUpliadRequest {
  type: typeof TaskActionTypes.TASKS_UPLOAD;
  payload: { id: number; params: string; value: string | Date };
}

export type TaskSuccess = {
  type: typeof TaskActionTypes.TASKS_SUCCESS;
  payload: TaskSuccessPayLoad;
};

export type TaskFailure = {
  type: typeof TaskActionTypes.TASKS_ERROR;
  payload: TaskFailurePayload;
};

export type TaskAction =
  | TaskRequestAction
  | TaskSuccessAction
  | TaskErrorAction
  | TaskUploadAction;
