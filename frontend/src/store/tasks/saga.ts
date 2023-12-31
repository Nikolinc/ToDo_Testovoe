import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  ITask,
  TaskActionTypes,
  TaskFailure,
  TaskFailurePayload,
  TaskSuccess,
  TaskSuccessPayLoad,
} from "types/tasks";

const getTask = async (args: { id: string }) => {
  return (await axios.get(`http://localhost:7700/task/project/${args.id}`))
    .data;
};

const upload = async (args: {
  id: string;
  params: string;
  value: string | Date;
}) => {
  return (await axios.post(`http://localhost:7700/task/upload`, args)).data;
};

const create = async (args: any) => {
  return (await axios.post(`http://localhost:7700/task/create`, args)).data;
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
    const response: { task: ITask[] } = yield call(getTask, action.payload);
    yield put(taskSuccess(response));
  } catch (e: any) {
    yield put(taskFailure({ error: e.messag }));
  }
}

function* createSaga(action: any) {
  try {
    const response: { task: ITask[] } = yield call(create, action.payload);
    yield put(taskSuccess(response));
  } catch (e: any) {
    yield put(taskFailure({ error: e.messag }));
  }
}

function* uploadTaskSaga(action: any) {
  try {
    const response: { task: ITask[] } = yield call(upload, action.payload);
    yield put(taskSuccess(response));
  } catch (e: any) {
    yield put(taskFailure({ error: e.messag }));
  }
}

function* taskWatcher() {
  yield all([takeLatest(TaskActionTypes.TASK_CREATE, createSaga)]);
  yield all([takeLatest(TaskActionTypes.TASKS_REQUEST, taskSaga)]);
  yield all([takeLatest(TaskActionTypes.TASKS_UPLOAD, uploadTaskSaga)]);
}

export default taskWatcher;
