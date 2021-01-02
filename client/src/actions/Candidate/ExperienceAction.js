import Axios from "axios";
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

const listExperience = () => async (dispatch, getState) => {
  try {
    dispatch({ type: EXPERIENCE_LIST_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get("/experience/", {
      headers: {
        "x-auth-token": userInfo.token,
      },
    });
    dispatch({ type: EXPERIENCE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: EXPERIENCE_LIST_FAIL, payload: error });
  }
};

const addExperience = (experience) => async (dispatch, getState) => {
  try {
    dispatch({ type: EXPERIENCE_ADD_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!experience._id) {
      const { data } = await Axios.post("/experience/add", experience, {
        headers: {
          "x-auth-token": userInfo.token,
        },
      });
      dispatch({ type: EXPERIENCE_ADD_SUCCESS, payload: data });
    } else {
      const { data } = await Axios.post(
        "/experience/update/" + experience._id,
        experience,
        {
          headers: {
            "x-auth-token": userInfo.token,
          },
        }
      );
      dispatch({ type: EXPERIENCE_ADD_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: EXPERIENCE_ADD_FAIL, payload: error.response.data.msg });
  }
};

const deleteExperience = (experienceId) => async (dispatch, getState) => {
  try {
    dispatch({ type: EXPERIENCE_DELETE_REQUEST, payload: experienceId });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete("/experience/" + experienceId, {
      headers: {
        "x-auth-token": userInfo.token,
      },
    });
    dispatch({ type: EXPERIENCE_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: EXPERIENCE_DELETE_FAIL, payload: error.message });
  }
};

export { listExperience, addExperience, deleteExperience };
