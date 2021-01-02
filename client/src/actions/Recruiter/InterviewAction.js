import Axios from "axios";
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

const listInterview = () => async (dispatch, getState) => {
  try {
    dispatch({ type: INTERVIEW_LIST_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get("/interview/", {
      headers: {
        "x-auth-token": userInfo.token,
      },
    });
    dispatch({ type: INTERVIEW_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: INTERVIEW_LIST_FAIL, payload: error });
  }
};

const addInterview = (interview) => async (dispatch, getState) => {
  try {
    dispatch({ type: INTERVIEW_ADD_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!interview._id) {
      const { data } = await Axios.post("/interview/add", interview, {
        headers: {
          "x-auth-token": userInfo.token,
        },
      });
      dispatch({ type: INTERVIEW_ADD_SUCCESS, payload: data });
    } else {
      const { data } = await Axios.post(
        "/interview/update/" + interview._id,
        interview,
        {
          headers: {
            "x-auth-token": userInfo.token,
          },
        }
      );
      dispatch({ type: INTERVIEW_ADD_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: INTERVIEW_ADD_FAIL, payload: error.response.data.msg });
  }
};

const deleteInterview = (interviewId) => async (dispatch, getState) => {
  try {
    dispatch({ type: INTERVIEW_DELETE_REQUEST, payload: interviewId });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete("/interview/" + interviewId, {
      headers: {
        "x-auth-token": userInfo.token,
      },
    });
    dispatch({ type: INTERVIEW_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: INTERVIEW_DELETE_FAIL, payload: error.message });
  }
};

export { listInterview, addInterview, deleteInterview };
