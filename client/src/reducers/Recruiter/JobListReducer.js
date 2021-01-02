import {
  JOB_LIST_REQUEST,
  JOB_LIST_SUCCESS,
  JOB_LIST_FAIL,
  JOB_ADD_REQUEST,
  JOB_ADD_SUCCESS,
  JOB_ADD_FAIL,
  JOB_DELETE_REQUEST,
  JOB_DELETE_SUCCESS,
  JOB_DELETE_FAIL,
} from "../../constants/JobListConstants";

const jobListReducer = (
  state = {
    jobs: [],
  },
  action
) => {
  switch (action.type) {
    case JOB_LIST_REQUEST:
      return { loading: true, jobs: [] };
    case JOB_LIST_SUCCESS:
      return { loading: false, jobs: action.payload };
    case JOB_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const addJobReducer = (state = { job: {} }, action) => {
  switch (action.type) {
    case JOB_ADD_REQUEST:
      return { loading: true };
    case JOB_ADD_SUCCESS:
      return { loading: false, success: true, job: action.payload };
    case JOB_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const deleteJobReducer = (
  state = {
    job: {},
  },
  action
) => {
  switch (action.type) {
    case JOB_DELETE_REQUEST:
      return { loading: true };
    case JOB_DELETE_SUCCESS:
      return { loading: false, success: true, job: action.payload };
    case JOB_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export { jobListReducer, addJobReducer, deleteJobReducer };
