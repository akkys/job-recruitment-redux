import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addProfile,
  listProfile,
} from "../../../actions/Candidate/ProfileActions";
import ErrorAlert from "../../../misc/ErrorAlert";
import LoadingPage from "../../pages/LoadingPage";
import Profile from "./Profile";

const ProfilePage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [miniResume, setMiniResume] = useState("");
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState([]);
  const [userName, setUsername] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const profileList = useSelector((state) => state.profileList);
  const { profiles, loading } = profileList;
  const profileAdd = useSelector((state) => state.profileAdd);
  const { success: successSave, error: errorSave } = profileAdd;
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = `${userInfo.name} | Profile Details`;
    dispatch(listProfile());
  }, [dispatch]);
  console.log("Profile", profiles);

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProfile());
    return () => {
      //   cleanup
    };
  }, [dispatch, successSave]);

  const openModal = (profile) => {
    if (profile._id) {
      setModalVisible(true);
      setId(profile._id);
      setName(profile.name);
      setMiniResume(profile.miniResume);
      setSkills(profile.skills);
      setLocations(profile.locations);
      setRoles(profile.roles);
      setUsername(profile.userName);
    } else {
      setModalVisible(true);
      setId();
      setName();
      setMiniResume();
      setSkills([]);
      setLocations([]);
      setRoles([]);
      setUsername();
    }
  };

  const addSkills = () => {
    if (skill) {
      setSkills((skills) => [...skills, skill]);
      setSkill("");
    } else {
      return null;
    }
  };

  const deleteSkill = (index) => {
    const deletedSkill = skills.filter((skill) => skill !== index);
    setSkills(deletedSkill);
  };

  const addRole = () => {
    if (role) {
      setRoles((roles) => [...roles, role]);
      setRole("");
    } else {
      return null;
    }
  };

  const deleteRole = (index) => {
    const deletedrole = roles.filter((role) => role !== index);
    setRoles(deletedrole);
  };

  const addLocation = () => {
    if (location) {
      setLocations((locations) => [...locations, location]);
      setLocation("");
    } else {
      return null;
    }
  };

  const deleteLocation = (index) => {
    const deletedLocaction = locations.filter((loc) => loc !== index);
    setLocations(deletedLocaction);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const profile = {
      _id: id,
      name,
      miniResume,
      roles,
      locations,
      skills,
      userName,
    };
    dispatch(addProfile(profile));
    console.log(profile);
  };

  return loading ? (
    <LoadingPage />
  ) : (
    <div className="sample-container">
      <div className="row ">
        <div className="col-md-10">
          {profiles.length === 0 ? (
            <h2>{userInfo.name}</h2>
          ) : (
            <>
              {profiles.map((profile, i) => {
                return <h2 key={i}>{profile.name}</h2>;
              })}
            </>
          )}
        </div>
        <div className="col-md-2">
          {profiles.length === 0 ? (
            <button
              onClick={() => openModal({})}
              className="btn btn-md btn-primary "
            >
              Add Details
            </button>
          ) : (
            <>
              {profiles.map((profile, i) => {
                return (
                  <button
                    key={i}
                    onClick={() => openModal(profile)}
                    className="btn btn-md btn-success "
                  >
                    Update Details
                  </button>
                );
              })}
            </>
          )}
        </div>
      </div>
      {profiles.map((profile, i) => {
        return (
          <Profile
            profile={profile}
            key={i}
            userInfo={userInfo}
            openModal={openModal}
          />
        );
      })}
      {modalVisible && (
        <Modal
          show={modalVisible}
          onHide={() => setModalVisible(false)}
          size="lg"
          className="modal-container"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h2>{!id ? "Add Profile Details" : "Update Profile Details"}</h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              {errorSave && <ErrorAlert message={errorSave} />}
              <div className="form-group row">
                <label className="col-md-3">Full Name</label>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>{" "}
              <div className="form-group row">
                <label className="col-md-3">Username</label>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="userName"
                    value={userName}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3">Mini Resume</label>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="miniResume"
                    value={miniResume}
                    onChange={(e) => setMiniResume(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3" htmlFor="contract">
                  Roles
                </label>
                <div className="col-md-9">
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <div className="input-group-append">
                      <span
                        onClick={addRole}
                        className="input-group-text"
                        id="basic-addon2"
                      >
                        <i className="fa fa-plus" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                  {roles.length === null ? (
                    <small></small>
                  ) : (
                    <small>
                      {roles.map((role, i) => (
                        <span className="add-tags" key={i}>
                          {role}{" "}
                          <span onClick={() => deleteRole(role)}>
                            <i className="fa fa-times ml-1" />
                          </span>
                        </span>
                      ))}
                    </small>
                  )}
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3" htmlFor="contract">
                  Location
                </label>
                <div className="col-md-9">
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                    <div className="input-group-append">
                      <span
                        onClick={addLocation}
                        className="input-group-text"
                        id="basic-addon2"
                      >
                        <i className="fa fa-plus" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                  {locations.length === null ? (
                    <small></small>
                  ) : (
                    <small>
                      {locations.map((loc, i) => (
                        <span className="add-tags" key={i}>
                          {loc}{" "}
                          <span onClick={() => deleteLocation(loc)}>
                            <i className="fa fa-times ml-1" />
                          </span>
                        </span>
                      ))}
                    </small>
                  )}
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3">Skills</label>
                <div className="col-md-9">
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="skill"
                      value={skill}
                      onChange={(e) => setSkill(e.target.value)}
                    />
                    <div className="input-group-append">
                      <span
                        onClick={addSkills}
                        className="input-group-text"
                        id="basic-addon2"
                      >
                        <i className="fa fa-plus" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                  {skills.length === null ? (
                    <small></small>
                  ) : (
                    <small>
                      {skills.map((skill, i) => (
                        <span className="add-tags" key={i}>
                          {skill}{" "}
                          <span onClick={() => deleteSkill(role)}>
                            <i className="fa fa-times ml-1" />
                          </span>
                        </span>
                      ))}
                    </small>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-5 float-right"
              >
                {!id ? "Add Profile" : "Update Profile"}
              </button>
            </form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default ProfilePage;
