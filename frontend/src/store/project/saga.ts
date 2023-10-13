import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  IProject,
  ProjectActionTypes,
  ProjectsFailure,
  ProjectsFailurePayload,
  ProjectsSuccess,
  ProjectsSuccessPayLoad,
} from "types/project";

export const projectSuccess = (
  payload: ProjectsSuccessPayLoad
): ProjectsSuccess => ({
  type: ProjectActionTypes.PROJECT_SUCCESS,
  payload,
});

export const projectFailure = (
  payload: ProjectsFailurePayload
): ProjectsFailure => ({
  type: ProjectActionTypes.PROJECT_ERROR,
  payload,
});

const getProject = async () => {
  return (await axios.get("http://localhost:7700/project/all")).data;
};

const findId = async (args: { id: string }) => {
  return (await axios.get(`http://localhost:7700/project/${args.id}`)).data;
};

const upload = async (args: {
  id: string;
  params: string;
  value: string | Date | boolean;
}) => {
  return (await axios.post(`http://localhost:7700/project/upload`, args)).data;
};

function* projectSaga() {
  try {
    const response: { projects: IProject[] } = yield call(getProject);
    yield put(projectSuccess(response));
  } catch (e: any) {
    yield put(projectFailure({ error: e.messag }));
  }
}

function* projectSagaById(action: any) {
  try {
    const response: { projects: IProject[] } = yield call(
      findId,
      action.payload
    );
    yield put(projectSuccess(response));
  } catch (e: any) {
    yield put(projectFailure({ error: e.messag }));
  }
}

function* projectUpdateSaga(action: any) {
  try {
    const response: { projects: IProject[] } = yield call(
      upload,
      action.payload
    );
    yield put(projectSuccess(response));
  } catch (e: any) {
    yield put(projectFailure({ error: e.messag }));
  }
}

function* projectWatcher() {
  yield all([takeLatest(ProjectActionTypes.PROJECT_UPDATE, projectUpdateSaga)]);
  yield all([takeLatest(ProjectActionTypes.FIND_ID_PROJECT, projectSagaById)]);
  yield all([takeLatest(ProjectActionTypes.PROJECT_REQUEST, projectSaga)]);
}

export default projectWatcher;
