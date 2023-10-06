import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  Project,
  ProjectActionTypes,
  ProjectsFailure,
  ProjectsFailurePayload,
  ProjectsSuccess,
  ProjectsSuccessPayLoad,
} from "types/project";

const getProject = async () => {
  return (await axios.get("http://localhost:7700/project/all")).data;
};

const findId = async () => {
  return (
    await axios.get(`http://localhost:7700/project/6518743caa5bdefd82992ad5`)
  ).data;
};

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

function* projectSaga() {
  try {
    const response: { projects: Project[] } = yield call(getProject);
    console.log("response", response);
    yield put(projectSuccess(response));
  } catch (e: any) {
    yield put(projectFailure({ error: e.messag }));
  }
}

function* projectSagaById(action: any) {
  try {
    const response: { projects: Project[] } = yield call(findId);
    console.log("response", response);
    yield put(projectSuccess(response));
  } catch (e: any) {
    yield put(projectFailure({ error: e.messag }));
  }
}

function* projectWatcher() {
  yield all([takeLatest(ProjectActionTypes.FIND_ID_PROJECT, projectSagaById)]);
  yield all([takeLatest(ProjectActionTypes.PROJECT_REQUEST, projectSaga)]);
}

export default projectWatcher;
