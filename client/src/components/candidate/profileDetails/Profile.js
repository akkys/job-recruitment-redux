import React from "react";

const Profile = (props) => {
  const { profile, userInfo, openModal } = props;
  console.log(props);
  const roles = profile.roles.map((role, i) => {
    return (
      <small key={i} className="tags">
        {role}
      </small>
    );
  });

  const locations = profile.locations.map((loc, i) => {
    return (
      <small key={i} className="tags">
        {loc}
      </small>
    );
  });

  const skills = profile.skills.map((skill, i) => {
    return (
      <small key={i} className="tags">
        {skill}
      </small>
    );
  });
  return (
    <div className="">
      <div className="row mt-3">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <h5>{profile.miniResume}</h5>
        </div>
      </div>
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-5">
          <p>
            <i className="fa fa-tag mr-2" />
            {roles}
          </p>
        </div>
        <div className="col-md-5">
          <p>
            <i className="fa fa-map-marker mr-2 " />
            {locations}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <label className="mr-2">SKILLS :</label>
          {skills}
        </div>
      </div>
    </div>
  );
};

export default Profile;
