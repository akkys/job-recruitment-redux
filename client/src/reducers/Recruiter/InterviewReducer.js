import {
  INTERVIEW_LIST_REQUEST,
  INTERVIEW_LIST_SUCCESS,
  INTERVIEW_LIST_FAIL,
  INTERVIEW_ADD_REQUEST,
  INTERVIEW_ADD_SUCCESS,
  INTERVIEW_ADD_FAIL,
  INTERVIEW_DELETE_REQUEST,
  INTERVIEW_DELETE_SUCCESS,
  INTERVIEW_DELETE_FAIL,
} from "../../constants/InterviewConstants";

const interviewListReducer = (
  state = {
    interviews: [],
  },
  action
) => {
  switch (action.type) {
    case INTERVIEW_LIST_REQUEST:
      return { loading: true, interviews: [] };
    case INTERVIEW_LIST_SUCCESS:
      return { loading: false, interviews: action.payload };
    case INTERVIEW_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const addInterviewReducer = (state = { interview: {} }, action) => {
  switch (action.type) {
    case INTERVIEW_ADD_REQUEST:
      return { loading: true };
    case INTERVIEW_ADD_SUCCESS:
      return { loading: false, success: true, interview: action.payload };
    case INTERVIEW_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const deleteInterviewReducer = (
  state = {
    interview: {},
  },
  action
) => {
  switch (action.type) {
    case INTERVIEW_DELETE_REQUEST:
      return { loading: true };
    case INTERVIEW_DELETE_SUCCESS:
      return { loading: false, success: true, interview: action.payload };
    case INTERVIEW_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export { interviewListReducer, addInterviewReducer, deleteInterviewReducer };
