import React from "react";
import ExperienceDetails from "../experienceDetails/ExperienceDetails";
import ProjectDetails from "../projectsDetails/ProjectDetails";
import ProfilePage from "./ProfilePage";

const ProfileDetails = () => {
  return (
    <div className="home-container container mb-5">
      <ProfilePage />
      <ExperienceDetails />
      <ProjectDetails />
    </div>
  );
};

export default ProfileDetails;
