import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addExperience,
  deleteExperience,
  listExperience,
} from "../../../actions/Candidate/ExperienceAction";
import ErrorAlert from "../../../misc/ErrorAlert";
import LoadingPage from "../../pages/LoadingPage";
import DeleteExpModal from "./DeleteExpModal";
import Experience from "./Experience";

const ExperienceDetails = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [cmpName, setCmpName] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const experienceList = useSelector((state) => state.experienceList);
  const { experiences, loading } = experienceList;
  const experienceAdd = useSelector((state) => state.experienceAdd);
  const { success: successSave, error: errorSave } = experienceAdd;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listExperience());
  }, [dispatch]);
  console.log(experiences);

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listExperience());
    return () => {
      //   cleanup
    };
  }, [dispatch, successSave]);

  const openModal = (experience) => {
    if (experience._id) {
      setModalVisible(true);
      setId(experience._id);
      setCmpName(experience.cmpName);
      setRole(experience.role);
      setDescription(experience.description);
      setFromDate(experience.fromDate);
      setToDate(experience.toDate);
    } else {
      setModalVisible(true);
      setId();
      setCmpName();
      setRole();
      setDescription();
      setFromDate();
      setToDate();
    }
  };

  const openDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const deleteHandler = (experience) => {
    dispatch(deleteExperience(experience._id));
    setDeleteModalVisible(false);
    dispatch(listExperience());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const experience = {
      _id: id,
      cmpName,
      role,
      description,
      fromDate,
      toDate,
    };
    dispatch(addExperience(experience));
    console.log(experience);
  };

  return loading ? (
    <LoadingPage />
  ) : (
    <div className="sample-container mt-3">
      <div className="row mb-3">
        <div className="col-md-11">
          <h4>Experiences</h4>
        </div>
        <div className="col-md-1">
          <button
            onClick={() => openModal({})}
            className="btn btn-sm btn-primary btn-block "
          >
            Add
          </button>
        </div>
      </div>
      {experiences.map((experience, i) => {
        return (
          <Experience
            experience={experience}
            key={i}
            openModal={openModal}
            deleteHandler={deleteHandler}
            openDeleteModal={openDeleteModal}
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
                <label className="col-md-3">Company Name</label>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="cmpName"
                    value={cmpName}
                    onChange={(e) => setCmpName(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3">Role</label>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3">Description</label>
                <div className="col-md-9">
                  <textarea
                    type="text"
                    className="form-control"
                    rows="3"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3">Experience</label>
                <div className="col-md-4">
                  <input
                    type="date"
                    className="form-control"
                    name="fromDate"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-4">
                  <input
                    type="date"
                    className="form-control"
                    name="toDate"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-5 float-right"
              >
                {!id ? "Add Experience" : "Update Experience"}
              </button>
            </form>
          </Modal.Body>
        </Modal>
      )}
      {experiences.map((experience, i) => {
        return (
          <div key={i}>
            {deleteModalVisible && (
              <DeleteExpModal
                key={i}
                experience={experience}
                deleteHandler={deleteHandler}
                openDeleteModal={openDeleteModal}
                deleteModalVisible={deleteModalVisible}
                setDeleteModalVisible={setDeleteModalVisible}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ExperienceDetails;
