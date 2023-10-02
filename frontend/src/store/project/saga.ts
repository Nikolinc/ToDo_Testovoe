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
  console.log("project", answer);
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

function* projectSaga(action: any) {
  try {
    const response: { projects: Project[] } = yield call(getProject);

    yield put(
      projectSuccess({
        projects: response.projects,
      })
    );
  } catch (e: any) {
    yield put(projectFailure({ error: e.messag }));
  }
}

function* projectWatcher() {
  yield all([takeLatest(ProjectActionTypes.PROJECT_REQUEST, projectSaga)]);
}

export default projectWatcher;
