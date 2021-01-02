import Axios from "axios";
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

const listProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PROFILE_LIST_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get("/candidate/", {
      headers: {
        "x-auth-token": userInfo.token,
      },
    });
    dispatch({ type: PROFILE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PROFILE_LIST_FAIL, payload: error });
  }
};

const addProfile = (profile) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROFILE_ADD_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!profile._id) {
      const { data } = await Axios.post("/candidate/add", profile, {
        headers: {
          "x-auth-token": userInfo.token,
        },
      });
      dispatch({ type: PROFILE_ADD_SUCCESS, payload: data });
    } else {
      const { data } = await Axios.post(
        "/candidate/update/" + profile._id,
        profile,
        {
          headers: {
            "x-auth-token": userInfo.token,
          },
        }
      );
      dispatch({ type: PROFILE_ADD_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: PROFILE_ADD_FAIL, payload: error.response.data.msg });
  }
};

const deleteProfile = (profileId) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROFILE_DELETE_REQUEST, payload: profileId });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete("/candidate/" + profileId, {
      headers: {
        "x-auth-token": userInfo.token,
      },
    });
    dispatch({ type: PROFILE_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: PROFILE_DELETE_FAIL, payload: error.message });
  }
};

export { listProfile, addProfile, deleteProfile };
