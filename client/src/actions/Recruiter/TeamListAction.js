import Axios from "axios";
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

const listTeam = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TEAM_LIST_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get("/addTeam/", {
      headers: {
        "x-auth-token": userInfo.token,
      },
    });
    dispatch({ type: TEAM_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TEAM_LIST_FAIL, payload: error });
  }
};

const addTeam = (team) => async (dispatch, getState) => {
  try {
    dispatch({ type: TEAM_ADD_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!team._id) {
      const { data } = await Axios.post("/addTeam/add", team, {
        headers: {
          "x-auth-token": userInfo.token,
        },
      });
      dispatch({ type: TEAM_ADD_SUCCESS, payload: data });
    } else {
      const { data } = await Axios.post("/addTeam/update/" + team._id, team, {
        headers: {
          "x-auth-token": userInfo.token,
        },
      });
      dispatch({ type: TEAM_ADD_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: TEAM_ADD_FAIL, payload: error.response.data.msg });
  }
};

const deleteTeam = (teamId) => async (dispatch, getState) => {
  try {
    dispatch({ type: TEAM_DELETE_REQUEST, payload: teamId });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete("/addTeam/" + teamId, {
      headers: {
        "x-auth-token": userInfo.token,
      },
    });
    dispatch({ type: TEAM_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: TEAM_DELETE_FAIL, payload: error.message });
  }
};

export { listTeam, addTeam, deleteTeam };
