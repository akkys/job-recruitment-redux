import Axios from "axios";
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

const listJobs = () => async (dispatch, getState) => {
  try {
    dispatch({ type: JOB_LIST_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get("/jobList/", {
      headers: {
        "x-auth-token": userInfo.token,
      },
    });
    dispatch({ type: JOB_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: JOB_LIST_FAIL, payload: error });
  }
};

const listAllJobs = () => async (dispatch) => {
  try {
    dispatch({ type: JOB_LIST_REQUEST });

    const { data } = await Axios.get("/jobList/all");
    dispatch({ type: JOB_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: JOB_LIST_FAIL, payload: error });
  }
};

const addJob = (job) => async (dispatch, getState) => {
  try {
    dispatch({ type: JOB_ADD_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!job._id) {
      const { data } = await Axios.post("/jobList/add", job, {
        headers: {
          "x-auth-token": userInfo.token,
        },
      });
      dispatch({ type: JOB_ADD_SUCCESS, payload: data });
    } else {
      const { data } = await Axios.post("/jobList/update/" + job._id, job, {
        headers: {
          "x-auth-token": userInfo.token,
        },
      });
      dispatch({ type: JOB_ADD_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: JOB_ADD_FAIL, payload: error.response.data.msg });
  }
};

const deleteJob = (jobId) => async (dispatch, getState) => {
  try {
    dispatch({ type: JOB_DELETE_REQUEST, payload: jobId });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete("/jobList/" + jobId, {
      headers: {
        "x-auth-token": userInfo.token,
      },
    });
    dispatch({ type: JOB_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: JOB_DELETE_FAIL, payload: error.message });
  }
};

export { listJobs, addJob, deleteJob, listAllJobs };
