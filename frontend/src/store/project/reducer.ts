import { RootState } from "store";
import {
  ProjectActionTypes,
  ProjectsAction,
  ProjectsState,
  ProjectRequest
} from "types/project";

const initialState: ProjectsState = {
  project: [
    {
      _id: "0",
      title: "-",
      description: "-",
      user: "-",
      image: ",",
      file: "-",
      DueDate: new Date(),
      CreateDate: new Date(),
      Update: new Date(), 
    },
  ],
  loading: false,
  error: null,
};

export const reducer = (
  state = initialState,
  action: ProjectsAction
): ProjectsState => {
  switch (action.type) {
    case ProjectActionTypes.PROJECT_REQUEST:
      return { ...state, loading: true };
    case ProjectActionTypes.PROJECT_SUCCESS:
      return { ...state, loading: false, project: action.payload };
    case ProjectActionTypes.PROJECT_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const fecthProject = ():ProjectRequest => ({ type: ProjectActionTypes.PROJECT_REQUEST})

export const ProjectSelector = {
  getProject: (state: RootState) => state.project.project,
  getLoading: (state: RootState) => state.project.loading,
  getError: (state: RootState) => state.project.error,
};

export default reducer;
