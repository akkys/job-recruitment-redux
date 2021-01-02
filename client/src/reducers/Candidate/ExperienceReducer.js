import {
  EXPERIENCE_LIST_REQUEST,
  EXPERIENCE_LIST_SUCCESS,
  EXPERIENCE_LIST_FAIL,
  EXPERIENCE_ADD_REQUEST,
  EXPERIENCE_ADD_SUCCESS,
  EXPERIENCE_ADD_FAIL,
  EXPERIENCE_DELETE_REQUEST,
  EXPERIENCE_DELETE_SUCCESS,
  EXPERIENCE_DELETE_FAIL,
} from "../../constants/ExperienceConstants";

const experienceListReducer = (
  state = {
    experiences: [],
  },
  action
) => {
  switch (action.type) {
    case EXPERIENCE_LIST_REQUEST:
      return { loading: true, experiences: [] };
    case EXPERIENCE_LIST_SUCCESS:
      return { loading: false, experiences: action.payload };
    case EXPERIENCE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const addExperienceReducer = (state = { experience: {} }, action) => {
  switch (action.type) {
    case EXPERIENCE_ADD_REQUEST:
      return { loading: true };
    case EXPERIENCE_ADD_SUCCESS:
      return { loading: false, success: true, experience: action.payload };
    case EXPERIENCE_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const deleteExperienceeReducer = (
  state = {
    experience: {},
  },
  action
) => {
  switch (action.type) {
    case EXPERIENCE_DELETE_REQUEST:
      return { loading: true };
    case EXPERIENCE_DELETE_SUCCESS:
      return { loading: false, success: true, experience: action.payload };
    case EXPERIENCE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export {
  experienceListReducer,
  addExperienceReducer,
  deleteExperienceeReducer,
};
