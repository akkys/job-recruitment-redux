import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import EmployerDetails from "./components/recruiter/EmployerDetails/EmployerDetails";
import IntegrationDetails from "./components/recruiter/IntegrationDetails/IntegrationDetails";
import AgenciesDetails from "./components/recruiter/AgenciesDetails/AgenciesDetails";
import HomePage from "./components/pages/HomePage";
import WelcomPage from "./components/pages/WelcomePage";
import JobListPage from "./components/recruiter/jobDetails/JobListPage";
import TeamListPage from "./components/recruiter/TeamDetails/TeamListPage";
import InterviewListPage from "./components/recruiter/InterviewDetails/InterviewListPage";
import CompanyDetails from "./components/recruiter/companyDetails/CompanyDetails";
import ProfileDetails from "./components/candidate/profileDetails/ProfileDetails";
import PageNotFound from "./misc/PageNotFound";
import LandingPage from "./components/pages/LandingPage";
import BlogListPage from "./components/recruiter/BlogDetails/BlogListPage";
import AboutUsPage from "./components/pages/AboutUsPage";
import BlogPage from "./components/pages/BlogPage";

const Routes = (props) => {
  return (
    <div>
      <Router>
        <Header />

        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/welcome" component={WelcomPage} />
          <Route path="/aboutUs" component={AboutUsPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/employerDetails" component={EmployerDetails} />
          <Route path="/agenciesDetails" component={AgenciesDetails} />
          <Route path="/integrationDetails" component={IntegrationDetails} />
          <Route path="/jobList" component={JobListPage} />
          <Route path="/teamList" component={TeamListPage} />
          <Route path="/interviewList" component={InterviewListPage} />
          <Route path="/companyDetails" component={CompanyDetails} />
          <Route path="/candidateProfile" component={ProfileDetails} />
          <Route path="/blogsList" component={BlogListPage} />
          <Route path="/allBlogsList" component={BlogPage} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
};

export default Routes;
