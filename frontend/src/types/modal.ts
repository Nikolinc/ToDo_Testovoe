export enum ModalActionTypes {
  MODAL_ADD_USER = "MODAL_ADD_USER",
  MODAL_ADD_DUE_DATE = "MODAL_ADD_DUE_DATE",
  MODAL_ADD_FILE = "MODAL_ADD_FILE",
  MODAL_PROFILE = "MODAL_PROFILE",
  MODAL_ADD_TASKS = "MODAL_ADD_TASKS",
}

interface AddUser {
  type: ModalActionTypes.MODAL_ADD_USER;
  payload: boolean;
}

interface AddDueDate {
  type: ModalActionTypes.MODAL_ADD_DUE_DATE;
  payload: boolean;
}

interface AddFile {
  type: ModalActionTypes.MODAL_ADD_FILE;
  payload: boolean;
}

interface profile {
  type: ModalActionTypes.MODAL_PROFILE;
  payload: boolean;
}

interface AddTasks {
  type: ModalActionTypes.MODAL_ADD_TASKS;
  payload: boolean;
}


export interface AddUserRequest{
  type: typeof ModalActionTypes.MODAL_ADD_USER
}
export type ProjectsAction =
  | AddUser
  | AddDueDate
  | AddFile
  | profile
  | AddTasks;
