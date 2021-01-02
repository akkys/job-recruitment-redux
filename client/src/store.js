import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Cookie from "js-cookie";
import { userRegisterReducer, userSigninReducer } from "./reducers/UserReducer";
import {
  addJobReducer,
  deleteJobReducer,
  jobListReducer,
} from "./reducers/Recruiter/JobListReducer";
import {
  teamListReducer,
  addTeamReducer,
  deleteTeamReducer,
} from "./reducers/Recruiter/TeamListReducer";
import {
  interviewListReducer,
  addInterviewReducer,
  deleteInterviewReducer,
} from "./reducers/Recruiter/InterviewReducer";
import {
  addCompanyReducer,
  companyListReducer,
  deleteCompanyReducer,
} from "./reducers/Recruiter/CompanyReducer";
import {
  addProfileReducer,
  deleteProfileReducer,
  profileListReducer,
} from "./reducers/Candidate/ProfileReducer";
import {
  addExperienceReducer,
  deleteExperienceeReducer,
  experienceListReducer,
} from "./reducers/Candidate/ExperienceReducer";
import {
  addProjectReducer,
  deleteProjectReducer,
  projectListReducer,
} from "./reducers/Candidate/ProjectReducer";
import {
  addBlogReducer,
  blogListReducer,
  deleteBlogReducer,
} from "./reducers/Recruiter/BlogReducer";

const userInfo = Cookie.getJSON("userInfo") || null;

const reducer = combineReducers({
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  jobsList: jobListReducer,
  jobAdd: addJobReducer,
  jobDelete: deleteJobReducer,
  teamList: teamListReducer,
  teamAdd: addTeamReducer,
  teamDelete: deleteTeamReducer,
  interviewList: interviewListReducer,
  interviewAdd: addInterviewReducer,
  interviewDelete: deleteInterviewReducer,
  companyList: companyListReducer,
  companyAdd: addCompanyReducer,
  companyDelete: deleteCompanyReducer,
  profileList: profileListReducer,
  profileAdd: addProfileReducer,
  profileDelete: deleteProfileReducer,
  experienceList: experienceListReducer,
  experienceAdd: addExperienceReducer,
  experienceDelete: deleteExperienceeReducer,
  projectList: projectListReducer,
  projectAdd: addProjectReducer,
  projectDelete: deleteProjectReducer,
  blogList: blogListReducer,
  blogAdd: addBlogReducer,
  blogDelete: deleteBlogReducer,
});

const initialState = {
  userSignin: { userInfo },
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
