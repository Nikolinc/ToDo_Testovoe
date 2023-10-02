import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { Project, ProjectActionTypes, ProjectsFailure, ProjectsFailurePayload, ProjectsSuccess, ProjectsSuccessPayLoad } from "types/project";

const instance = axios.create({
  baseURL: `http://localhost:7700/project/all`,
});

export async function request<Done>(config: any): Promise<Done> {
  return instance(config).then((response) => response.data);
}

const getProject = async () => {
  const answer = await request({
    method: "get",
    headers: {},
  });
  return answer;
};

export const projectSuccess = (payload: ProjectsSuccessPayLoad): ProjectsSuccess => ({
  type: ProjectActionTypes.PROJECT_SUCCESS,
  payload,
});

export const projectFailure = (payload: ProjectsFailurePayload): ProjectsFailure => ({
  type: ProjectActionTypes.PROJECT_ERROR,
  payload,
});

function* projectSaga() {
  try {
    const response:{projects:Project[]} = yield call(getProject);
    console.log("response",response)
    yield put(
      projectSuccess(
       response,
      )
    );
  } catch (e: any) {
    yield put(projectFailure({ error: e.messag }));
  }
}

function* projectWatcher() {
  yield all([takeLatest(ProjectActionTypes.PROJECT_REQUEST, projectSaga)]);
}

export default projectWatcher;
