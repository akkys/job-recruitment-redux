import {
  PROFILE_LIST_REQUEST,
  PROFILE_LIST_SUCCESS,
  PROFILE_LIST_FAIL,
  PROFILE_ADD_REQUEST,
  PROFILE_ADD_SUCCESS,
  PROFILE_ADD_FAIL,
  PROFILE_DELETE_REQUEST,
  PROFILE_DELETE_SUCCESS,
  PROFILE_DELETE_FAIL,
} from "../../constants/ProfileConstants";

const profileListReducer = (
  state = {
    profiles: [],
  },
  action
) => {
  switch (action.type) {
    case PROFILE_LIST_REQUEST:
      return { loading: true, profiles: [] };
    case PROFILE_LIST_SUCCESS:
      return { loading: false, profiles: action.payload };
    case PROFILE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const addProfileReducer = (state = { profile: {} }, action) => {
  switch (action.type) {
    case PROFILE_ADD_REQUEST:
      return { loading: true };
    case PROFILE_ADD_SUCCESS:
      return { loading: false, success: true, profile: action.payload };
    case PROFILE_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const deleteProfileReducer = (
  state = {
    company: {},
  },
  action
) => {
  switch (action.type) {
    case PROFILE_DELETE_REQUEST:
      return { loading: true };
    case PROFILE_DELETE_SUCCESS:
      return { loading: false, success: true, profile: action.payload };
    case PROFILE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export { profileListReducer, addProfileReducer, deleteProfileReducer };
