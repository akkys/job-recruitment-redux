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

const blogListReducer = (
  state = {
    blogs: [],
  },
  action
) => {
  switch (action.type) {
    case BLOG_LIST_REQUEST:
      return { loading: true, blogs: [] };
    case BLOG_LIST_SUCCESS:
      return { loading: false, blogs: action.payload };
    case BLOG_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const addBlogReducer = (state = { blog: {} }, action) => {
  switch (action.type) {
    case BLOG_ADD_REQUEST:
      return { loading: true };
    case BLOG_ADD_SUCCESS:
      return { loading: false, success: true, blog: action.payload };
    case BLOG_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const deleteBlogReducer = (
  state = {
    blog: {},
  },
  action
) => {
  switch (action.type) {
    case BLOG_DELETE_REQUEST:
      return { loading: true };
    case BLOG_DELETE_SUCCESS:
      return { loading: false, success: true, blog: action.payload };
    case BLOG_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export { blogListReducer, addBlogReducer, deleteBlogReducer };
