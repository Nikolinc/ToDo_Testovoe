export interface Project {
  _id: string;
  title: string;
  description: string;
  user: string;
  image: string;
  file: string;
  DueDate: Date;
  CreateDate: Date;
  Update:Date;
}

export interface ProjectsState {
  project: Project[];
  loading: boolean;
  error: null | string;
}

export enum ProjectActionTypes {
  PROJECT_REQUEST = "PROJECT_REQUEST",
  PROJECT_SUCCESS = "PROJECT_SUCCESS",
  PROJECT_ERROR = "PROJECT_ERROR",
  SET_PROJECT = "SET_PROJECT",
}

interface ProjectRequestAction {
  type: ProjectActionTypes.PROJECT_REQUEST;
}

interface ProjectSuccessAction {
  type: ProjectActionTypes.PROJECT_SUCCESS;
  payload: Project[];
}

interface ProjectErrorAction {
  type: ProjectActionTypes.PROJECT_ERROR;
  payload: string;
}

export interface ProjectsSuccessPayLoad {
  projects: Project[];
}

export interface ProjectsFailurePayload {
  error: string;
}

export interface ProjectRequest{
  type: typeof ProjectActionTypes.PROJECT_REQUEST
}

export  type ProjectsSuccess = {
  type: typeof ProjectActionTypes.PROJECT_SUCCESS;
  payload: ProjectsSuccessPayLoad;
};

export type ProjectsFailure = {
  type: typeof ProjectActionTypes.PROJECT_ERROR;
  payload: ProjectsFailurePayload;
};

export type ProjectsAction =
  | ProjectRequestAction
  | ProjectSuccessAction
  | ProjectErrorAction;
