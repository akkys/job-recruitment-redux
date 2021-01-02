import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listJobs,
  addJob,
  deleteJob,
  listAllJobs,
} from "../../../actions/Recruiter/JobListAction";
import LoadingPage from "../../pages/LoadingPage";
import ErrorAlert from "../../../misc/ErrorAlert";
import JobList from "./JobList";
import { Modal } from "react-bootstrap";
import DeleteJobModal from "./DeleteJobModal";
import PaginationBar from "../../layout/PaginationBar";
import PaginationButton from "../../layout/PaginationButton";

const JobListPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [role, setRole] = useState("");
  const [level, setLevel] = useState("");
  const [location, setLocation] = useState("");
  const [contract, setContract] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState("");
  const [tools, setTools] = useState([]);
  const [tool, setTool] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const jobsList = useSelector((state) => state.jobsList);
  const { jobs, loading } = jobsList;
  const jobAdd = useSelector((state) => state.jobAdd);
  const { success: successSave, error: errorSave } = jobAdd;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo.category === "Candidate") {
      return (document.title = "Startup Jobs | Job Recruitment");
    } else {
      return (document.title = "Job Lists | Job Recruitment");
    }
  });

  useEffect(() => {
    if (userInfo.category === "Employer") {
      dispatch(listJobs());
    } else {
      dispatch(listAllJobs());
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (successSave || userInfo.category === "Employer") {
      setModalVisible(false);
      dispatch(listJobs());
    } else dispatch(listAllJobs());
  }, [dispatch, successSave, userInfo]);

  const openModal = (job) => {
    if (job._id) {
      setModalVisible(true);
      setId(job._id);
      setCompanyName(job.companyName);
      setRole(job.role);
      setPosition(job.position);
      setLocation(job.location);
      setLevel(job.level);
      setContract(job.contract);
      setLanguages(job.languages);
      setTools(job.tools);
      setMinSalary(job.minSalary);
      setMaxSalary(job.maxSalary);
      setExperience(job.experience);
    } else {
      setModalVisible(true);
      setId();
      setCompanyName();
      setRole();
      setPosition();
      setLocation();
      setLevel();
      setContract();
      setLanguages([]);
      setTools([]);
      setMinSalary();
      setMaxSalary();
      setExperience();
    }
  };

  const openDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const contractTypes = [
    { contract: "Full-Time" },
    { contract: "Part-Time" },
    { contract: "Full-Time, Remote" },
    { contract: "Part-Time, Remote" },
    { contract: "Only Remote" },
  ];

  const experiences = [
    { experience: "1" },
    { experience: "2" },
    { experience: "3" },
    { experience: "4" },
    { experience: "5" },
    { experience: "5+" },
  ];

  const addLanguage = () => {
    if (language) {
      setLanguages((languages) => [...languages, language]);
      setLanguage("");
    } else {
      return null;
    }
  };

  const deleteLanguage = (index) => {
    const deletedLanguage = languages.filter((lang) => lang !== index);
    setLanguages(deletedLanguage);
  };

  const addTools = () => {
    if (tool) {
      setTools((tools) => [...tools, tool]);
      setTool("");
    } else {
      return null;
    }
  };

  const deleteTools = (index) => {
    const deletedTool = tools.filter((tool) => tool !== index);
    setTools(deletedTool);
  };

  //Delete Job
  const deleteHandler = (job) => {
    dispatch(deleteJob(job._id));
    setDeleteModalVisible(false);
    dispatch(listJobs());
  };

  //Add or Update Jobs
  const handleSubmit = (e) => {
    e.preventDefault();
    const job = {
      _id: id,
      companyName,
      role,
      position,
      level,
      location,
      contract,
      languages,
      tools,
      minSalary,
      maxSalary,
      experience,
    };
    dispatch(addJob(job));
    console.log(job);
    // props.history.push("/jobList");
  };

  //Pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < jobs.length / jobsPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return loading ? (
    <LoadingPage />
  ) : (
    <div className="home-container container">
      <div className="row">
        {jobs.length === 0 ? (
          <div className="col-md-10 mb-3">
            <h1>No Jobs Added!</h1>
          </div>
        ) : (
          <div className="col-md-10 mb-3">
            <h1>Jobs List</h1>
          </div>
        )}

        {userInfo ? (
          <>
            {userInfo.category === "Employer" && (
              <div className="col-md-2">
                <button
                  onClick={() => openModal({})}
                  className="btn btn-primary btn-lg btn-block"
                >
                  Add Job
                </button>
              </div>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
      <PaginationBar
        PerPage={jobsPerPage}
        total={jobs.length}
        paginate={paginate}
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
        perPageLength={currentJobs.length}
      />
      {currentJobs.map((job, i) => {
        return (
          <JobList
            job={job}
            key={i}
            userInfo={userInfo}
            openModal={openModal}
            deleteHandler={deleteHandler}
            openDeleteModal={openDeleteModal}
          />
        );
      })}
      <br />
      <PaginationButton
        PerPage={jobsPerPage}
        total={jobs.length}
        paginate={paginate}
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
      />
      {modalVisible && (
        <Modal
          show={modalVisible}
          onHide={() => setModalVisible(false)}
          size="lg"
          className="modal-container"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h2>{!id ? "Add New Job" : "Update Job"}</h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              {errorSave && <ErrorAlert message={errorSave} />}
              <div className="form-group row">
                <label className="col-md-3" htmlFor="companyName">
                  Company Name
                </label>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3" htmlFor="position">
                  Position
                </label>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3" htmlFor="role">
                  Role
                </label>
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
                <label className="col-md-3" htmlFor="level">
                  level
                </label>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="level"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3" htmlFor="location">
                  Location
                </label>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3" htmlFor="contract">
                  Contract
                </label>
                <div className="col-md-9">
                  <select
                    className="form-control"
                    onChange={(e) => setContract(e.target.value)}
                  >
                    {contractTypes.map(({ contract }) => {
                      return (
                        <option key={contract} name={contract} value={contract}>
                          {contract}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3" htmlFor="contract">
                  Languages
                </label>
                <div className="col-md-9">
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Add Required Languages"
                      name="language"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    />
                    <div className="input-group-append">
                      <span
                        onClick={addLanguage}
                        className="input-group-text"
                        id="basic-addon2"
                      >
                        <i className="fa fa-plus" />
                      </span>
                    </div>
                  </div>
                  <small>
                    {languages.length === null ? (
                      <span></span>
                    ) : (
                      <span>
                        {languages.map((lang, i) => (
                          <span className="add-tags" key={i}>
                            {lang}{" "}
                            <span onClick={() => deleteLanguage(lang)}>
                              <i className="fa fa-times ml-1" />
                            </span>
                          </span>
                        ))}
                      </span>
                    )}
                  </small>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-md-3" htmlFor="contract">
                  Tools
                </label>
                <div className="col-md-9">
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Add Required Tools "
                      name="tool"
                      value={tool}
                      onChange={(e) => setTool(e.target.value)}
                    />
                    <div className="input-group-append">
                      <span
                        onClick={addTools}
                        className="input-group-text"
                        id="basic-addon2"
                      >
                        <i className="fa fa-plus" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                  {tools.length === null ? (
                    <small></small>
                  ) : (
                    <small>
                      {tools.map((tool, i) => (
                        <span className="add-tags" key={i}>
                          {tool}{" "}
                          <span onClick={() => deleteTools(tool)}>
                            <i className="fa fa-times ml-1" />
                          </span>
                        </span>
                      ))}
                    </small>
                  )}
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3" htmlFor="minSalary">
                  CTC / year <small>(in Lakhs)</small>
                </label>
                <div className="col-md-2">
                  <input
                    type="text"
                    className="form-control"
                    name="minSalary"
                    value={minSalary}
                    onChange={(e) => setMinSalary(e.target.value)}
                    placeholder="Min"
                  />
                </div>

                <div className="col-md-2">
                  <input
                    type="text"
                    className="form-control"
                    name="maxSalary"
                    value={maxSalary}
                    onChange={(e) => setMaxSalary(e.target.value)}
                    placeholder="Max"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3" htmlFor="experience">
                  Experience <small>(in Years)</small>
                </label>
                <div className="col-md-2">
                  <select
                    className="form-control"
                    onChange={(e) => setExperience(e.target.value)}
                  >
                    {experiences.map(({ experience }) => {
                      return (
                        <option
                          key={experience}
                          name={experience}
                          value={experience}
                        >
                          {experience}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary mt-5 float-right"
              >
                {!id ? "Add Job" : "Update Job"}
              </button>
            </form>
          </Modal.Body>
        </Modal>
      )}

      {jobs.map((job, i) => {
        return (
          <div key={i}>
            {deleteModalVisible && (
              <DeleteJobModal
                key={i}
                job={job}
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

export default JobListPage;
