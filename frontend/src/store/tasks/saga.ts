import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  Task,
  TaskActionTypes,
  TaskFailure,
  TaskFailurePayload,
  TaskSuccess,
  TaskSuccessPayLoad,
} from "types/tasks";

const instance = axios.create({
  baseURL: `https://jsonplaceholder.typicode.com/users?_limit=10`,
});

export async function request<Done>(config: any): Promise<Done> {
  return instance(config).then((response) => response.data);
}

const getTask = async () => {
  const answer = await request({
    method: "get",
    headers: {},
  });
  console.log("tasks", answer);
  return answer;
};

export const taskSuccess = (payload: TaskSuccessPayLoad): TaskSuccess => ({
  type: TaskActionTypes.TASKS_SUCCESS,
  payload,
});

export const taskFailure = (payload: TaskFailurePayload): TaskFailure => ({
  type: TaskActionTypes.TASKS_ERROR,
  payload,
});

function* taskSaga(action: any) {
  try {
    const response: { tasks: Task[] } = yield call(getTask);

    yield put(
      taskSuccess({
        task: response.tasks,
      })
    );
  } catch (e: any) {
    yield put(taskFailure({ error: e.messag }));
  }
}

function* taskWatcher() {
  yield all([takeLatest(TaskActionTypes.TASKS_REQUEST, taskSaga)]);
}

export default taskWatcher;
