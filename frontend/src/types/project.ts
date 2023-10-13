export interface IProject {
  _id: string;
  title: string;
  description: string;
  user: string;
  image: string;
  file: string;
  DueDate: Date;
  CreateDate: Date;
  Update: Date;
  favorit: boolean;
}

export interface ProjectsState {
  project: IProject[];
  loading: boolean;
  error: null | string;
}

export enum ProjectActionTypes {
  PROJECT_REQUEST = "PROJECT_REQUEST",
  PROJECT_SUCCESS = "PROJECT_SUCCESS",
  PROJECT_ERROR = "PROJECT_ERROR",
  FIND_ID_PROJECT = "FIND_ID_PROJECT",
  PROJECT_UPDATE = "PROJECT_UPDATE",
  SET_PROJECT = "SET_PROJECT",
}

interface ProjectRequestAction {
  type: ProjectActionTypes.PROJECT_REQUEST;
}
interface ProjectUpdateAction {
  type: ProjectActionTypes.PROJECT_UPDATE;
  payload: any;
}
interface findIdAction {
  type: ProjectActionTypes.FIND_ID_PROJECT;
  payload: any;
}
interface ProjectSuccessAction {
  type: ProjectActionTypes.PROJECT_SUCCESS;
  payload: IProject[];
}
interface ProjectErrorAction {
  type: ProjectActionTypes.PROJECT_ERROR;
  payload: string;
}
export interface ProjectsSuccessPayLoad {
  projects: IProject[];
}

export interface ProjectsFailurePayload {
  error: string;
}

export interface ProjectRequest {
  type: typeof ProjectActionTypes.PROJECT_REQUEST;
}

export interface FindIdRequest {
  type: typeof ProjectActionTypes.FIND_ID_PROJECT;
  payload: { id: string };
}

export interface ProjectUpdateRequest {
  type: typeof ProjectActionTypes.PROJECT_UPDATE;
  payload: { id: string; params: string; value: string | Date | boolean };
}

export type ProjectsSuccess = {
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
  | ProjectErrorAction
  | ProjectUpdateAction
  | findIdAction;
