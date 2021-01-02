import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  addProject,
  deleteProject,
  listProject,
} from "../../../actions/Candidate/ProjectAction";
import ErrorAlert from "../../../misc/ErrorAlert";
import LoadingPage from "../../pages/LoadingPage";
import DeleteProjectModal from "./DeleteProjectModal";
import Project from "./Project";

const ProjectDetails = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [cmpName, setCmpName] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [role, setRole] = useState("");
  const [contribution, setContribution] = useState("");
  const [technologies, setTechnologies] = useState([]);
  const [technology, setTechnology] = useState("");
  const projectList = useSelector((state) => state.projectList);
  const { loading, projects } = projectList;
  const projectAdd = useSelector((state) => state.projectAdd);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = projectAdd;

  const dispatch = useDispatch();

  const addTechnologies = () => {
    if (technology) {
      setTechnologies((technologies) => [...technologies, technology]);
      setTechnology("");
    } else {
      return null;
    }
  };

  const deleteTechnology = (index) => {
    const deletedTech = technologies.filter((tech) => tech !== index);
    setTechnologies(deletedTech);
  };

  const openModal = (project) => {
    if (project._id) {
      setModalVisible(true);
      setId(project._id);
      setTitle(project.title);
      setSummary(project.summary);
      setDescription(project.description);
      setCmpName(project.cmpName);
      setRole(project.role);
      setFromDate(project.fromDate);
      setToDate(project.toDate);
      setContribution(project.contribution);
      setTechnologies(project.technologies);
    } else {
      setModalVisible(true);
      setId();
      setTitle();
      setSummary();
      setDescription();
      setCmpName();
      setRole();
      setFromDate();
      setToDate();
      setContribution();
      setTechnologies([]);
    }
  };

  useEffect(() => {
    dispatch(listProject());
  }, [dispatch]);
  console.log(projects);

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProject());
    return () => {
      //   cleanup
    };
  }, [dispatch, successSave]);

  const openDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const deleteHandler = (project) => {
    dispatch(deleteProject(project._id));
    setDeleteModalVisible(false);
    dispatch(listProject());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const project = {
      _id: id,
      title,
      summary,
      description,
      cmpName,
      role,
      fromDate,
      toDate,
      contribution,
      technologies,
    };
    dispatch(addProject(project));
  };

  return loading ? (
    <LoadingPage />
  ) : (
    <div className="sample-container mt-3">
      <div className="row mb-3">
        <div className="col-md-11">
          <h4>Projects</h4>
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
      {projects.map((project, i) => {
        return (
          <Project
            project={project}
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
              <h2>{!id ? "Add Project Details" : "Update Project Details"}</h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              {errorSave && <ErrorAlert message={errorSave} />}
              <div className="form-group row">
                <label className="col-md-3">Project Title</label>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>{" "}
              <div className="form-group row">
                <label className="col-md-3">Summary</label>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="summary"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
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
                <label className="col-md-3">
                  When did you work on this project?
                </label>
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
              <div className="form-group row">
                <label className="col-md-3">What was your role?</label>
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
              <div className="form-group ">
                <label>How did you contribute?</label>
                <div>
                  <textarea
                    type="text"
                    className="form-control"
                    name="contribution"
                    value={contribution}
                    onChange={(e) => setContribution(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>What technology and tools did you use?</label>
                <div>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="technology"
                      value={technology}
                      onChange={(e) => setTechnology(e.target.value)}
                    />
                    <div className="input-group-append">
                      <span
                        onClick={addTechnologies}
                        className="input-group-text"
                        id="basic-addon2"
                      >
                        <i className="fa fa-plus" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                  {technologies.length === null ? (
                    <small></small>
                  ) : (
                    <small>
                      {technologies.map((tech, i) => (
                        <span className="add-tags" key={i}>
                          {tech}{" "}
                          <span onClick={() => deleteTechnology(tech)}>
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
                {!id ? "Add Project" : "Update Project"}
              </button>
            </form>
          </Modal.Body>
        </Modal>
      )}
      {projects.map((project, i) => {
        return (
          <div key={i}>
            {deleteModalVisible && (
              <DeleteProjectModal
                key={i}
                project={project}
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

export default ProjectDetails;
