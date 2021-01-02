import {
  TEAM_LIST_REQUEST,
  TEAM_LIST_SUCCESS,
  TEAM_LIST_FAIL,
  TEAM_ADD_REQUEST,
  TEAM_ADD_SUCCESS,
  TEAM_ADD_FAIL,
  TEAM_DELETE_REQUEST,
  TEAM_DELETE_SUCCESS,
  TEAM_DELETE_FAIL,
} from "../../constants/TeamListConstants";

const teamListReducer = (
  state = {
    teams: [],
  },
  action
) => {
  switch (action.type) {
    case TEAM_LIST_REQUEST:
      return { loading: true, teams: [] };
    case TEAM_LIST_SUCCESS:
      return { loading: false, teams: action.payload };
    case TEAM_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const addTeamReducer = (state = { team: {} }, action) => {
  switch (action.type) {
    case TEAM_ADD_REQUEST:
      return { loading: true };
    case TEAM_ADD_SUCCESS:
      return { loading: false, success: true, team: action.payload };
    case TEAM_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const deleteTeamReducer = (
  state = {
    team: {},
  },
  action
) => {
  switch (action.type) {
    case TEAM_DELETE_REQUEST:
      return { loading: true };
    case TEAM_DELETE_SUCCESS:
      return { loading: false, success: true, team: action.payload };
    case TEAM_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export { teamListReducer, addTeamReducer, deleteTeamReducer };
