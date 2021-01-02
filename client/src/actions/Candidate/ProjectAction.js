import Axios from "axios";
import {
  PROJECT_LIST_REQUEST,
  PROJECT_LIST_SUCCESS,
  PROJECT_LIST_FAIL,
  PROJECT_ADD_REQUEST,
  PROJECT_ADD_SUCCESS,
  PROJECT_ADD_FAIL,
  PROJECT_DELETE_REQUEST,
  PROJECT_DELETE_SUCCESS,
  PROJECT_DELETE_FAIL,
} from "../../constants/ProjectConstants";

const listProject = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PROJECT_LIST_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get("/projects/", {
      headers: {
        "x-auth-token": userInfo.token,
      },
    });
    dispatch({ type: PROJECT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PROJECT_LIST_FAIL, payload: error });
  }
};

const addProject = (project) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROJECT_ADD_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!project._id) {
      const { data } = await Axios.post("/projects/add", project, {
        headers: {
          "x-auth-token": userInfo.token,
        },
      });
      dispatch({ type: PROJECT_ADD_SUCCESS, payload: data });
    } else {
      const { data } = await Axios.post(
        "/projects/update/" + project._id,
        project,
        {
          headers: {
            "x-auth-token": userInfo.token,
          },
        }
      );
      dispatch({ type: PROJECT_ADD_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: PROJECT_ADD_FAIL, payload: error.response.data.msg });
  }
};

const deleteProject = (projectId) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROJECT_DELETE_REQUEST, payload: projectId });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete("/projects/" + projectId, {
      headers: {
        "x-auth-token": userInfo.token,
      },
    });
    dispatch({ type: PROJECT_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: PROJECT_DELETE_FAIL, payload: error.message });
  }
};

export { listProject, addProject, deleteProject };
