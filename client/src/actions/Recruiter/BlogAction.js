import Axios from "axios";
import {
  BLOG_LIST_REQUEST,
  BLOG_LIST_SUCCESS,
  BLOG_LIST_FAIL,
  BLOG_ADD_REQUEST,
  BLOG_ADD_SUCCESS,
  BLOG_ADD_FAIL,
  BLOG_DELETE_REQUEST,
  BLOG_DELETE_SUCCESS,
  BLOG_DELETE_FAIL,
} from "../../constants/BlogConstants";

const listBlog = () => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOG_LIST_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get("/blogs/", {
      headers: {
        "x-auth-token": userInfo.token,
      },
    });
    dispatch({ type: BLOG_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: BLOG_LIST_FAIL, payload: error });
  }
};

const listAllBlogs = () => async (dispatch) => {
  try {
    dispatch({ type: BLOG_LIST_REQUEST });

    const { data } = await Axios.get("/blogs/all");
    dispatch({ type: BLOG_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: BLOG_LIST_FAIL, payload: error });
  }
};

const addBlog = (blog) => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOG_ADD_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!blog._id) {
      const { data } = await Axios.post("/blogs/add", blog, {
        headers: {
          "x-auth-token": userInfo.token,
        },
      });
      dispatch({ type: BLOG_ADD_SUCCESS, payload: data });
    } else {
      const { data } = await Axios.post("/blogs/update/" + blog._id, blog, {
        headers: {
          "x-auth-token": userInfo.token,
        },
      });
      dispatch({ type: BLOG_ADD_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: BLOG_ADD_FAIL, payload: error.response.data.msg });
  }
};

const deleteBlog = (blogId) => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOG_DELETE_REQUEST, payload: blogId });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete("/blogs/" + blogId, {
      headers: {
        "x-auth-token": userInfo.token,
      },
    });
    dispatch({ type: BLOG_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: BLOG_DELETE_FAIL, payload: error.message });
  }
};

export { listBlog, addBlog, deleteBlog, listAllBlogs };
