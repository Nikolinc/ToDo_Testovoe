import { RootState } from "store";
import {
  TaskState,
  TaskAction,
  TaskActionTypes,
  IPriority,
  IStatus,
} from "types/tasks";

const initialState: TaskState = {
  tasks: [
    {
      _id: "0",
      title: "first tasks",
      description: "-",
      createDate: "-",
      timeAtWork: "-",
      expirationDate: "-",
      priority: IPriority.Low,
      file: "-",
      currentStatus: IStatus.Queue,
      coments: "-",
      project: "-",
    },
  ],
  loading: false,
  error: null,
};

export const reducer = (
  state = initialState,
  action: TaskAction
): TaskState => {
  switch (action.type) {
    case TaskActionTypes.TASKS_REQUEST:
      return { ...state, loading: true };
    case TaskActionTypes.TASKS_UPLOAD:
      return { ...state, loading: true };
    case TaskActionTypes.TASKS_SUCCESS:
      return { ...state, loading: false, tasks: action.payload };
    case TaskActionTypes.TASKS_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const fecthTasks = (args: { id: string }) => ({
  type: TaskActionTypes.TASKS_REQUEST,
  payload: args,
});

export const createTask = (args: any) => ({
  type: TaskActionTypes.TASK_CREATE,
  payload: args,
});

export const uploadTask = (args: {
  id: string;
  params: string;
  value: string | Date;
}) => ({
  type: TaskActionTypes.TASKS_UPLOAD,
  payload: args,
});

export const TaskSelector = {
  getTask: (state: RootState) => state.task.tasks,
};

export default reducer;
