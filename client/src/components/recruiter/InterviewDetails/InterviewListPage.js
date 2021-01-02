import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addInterview,
  deleteInterview,
  listInterview,
} from "../../../actions/Recruiter/InterviewAction";
import ErrorAlert from "../../../misc/ErrorAlert";
import PaginationButton from "../../layout/PaginationButton";
import LoadingPage from "../../pages/LoadingPage";
import InterviewList from "./InterviewList";

const InterviewListPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [interviewer, setInterviewer] = useState("");
  const [inttype, setInttype] = useState("");
  const [interviewType, setInterviewType] = useState([]);
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [interviewsPerPage] = useState(5);

  const interviewList = useSelector((state) => state.interviewList);
  const { interviews, loading } = interviewList;
  const interviewAdd = useSelector((state) => state.interviewAdd);
  const { success: successSave, error: errorSave } = interviewAdd;

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Schedule Interview | Job Recruitment";
    async function getInterviewTypes() {
      const interviewTypeData = await Axios.get(
        "http://localhost:5000/intType/"
      );
      if (interviewTypeData.data.length > 0) {
        return (
          setInterviewType(
            interviewTypeData.data.map((inttypes) => inttypes.inttype)
          ),
          setInttype(interviewTypeData.data[0].inttype)
        );
      }
    }
    getInterviewTypes();
  }, []);
  console.log(interviewType);

  useEffect(() => {
    dispatch(listInterview());
  }, [dispatch]);
  console.log(interviews);

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listInterview());
  }, [dispatch, successSave]);

  const openModal = (interview) => {
    if (interview._id) {
      setModalVisible(true);
      setId(interview._id);
      setName(interview.name);
      setEmail(interview.email);
      setDate(interview.date);
      setInterviewer(interview.interviewer);
      // setInterviewType(interview.interviewType);
      setInttype(interview.inttype);
      setStatus(interview.status);
    } else {
      setModalVisible(true);
      setId();
      setName();
      setEmail();
      setDate();
      setInterviewer();
      // setInterviewType(interviewType);
      setInttype();
      setStatus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const interview = {
      _id: id,
      name,
      email,
      date,
      interviewer,
      inttype,
      status,
    };
    dispatch(addInterview(interview));
    console.log(interview);
  };

  const deleteHandler = (interview) => {
    dispatch(deleteInterview(interview._id));

    dispatch(listInterview());
  };

  //Pagination
  const indexOfLastInterview = currentPage * interviewsPerPage;
  const indexOfFirstInterview = indexOfLastInterview - interviewsPerPage;
  const currentInterviews = interviews.slice(
    indexOfFirstInterview,
    indexOfLastInterview
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < interviews.length / interviewsPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return loading ? (
    <LoadingPage />
  ) : (
    <div className="container home-container">
      <div className="row">
        <div className="col-md-10">
          <h1>Live Interviews</h1>
        </div>
        <div className="col-md-2">
          <button
            onClick={() => openModal({})}
            className="btn btn-primary btn-lg btn-block"
          >
            Schedule
          </button>
        </div>
      </div>
      <h4 className="ml-3 mt-3">
        {currentInterviews.length} of {interviews.length} results.
      </h4>
      <div className="table-responsive">
        <table className="table table-container">
          <thead className="table-active">
            <tr>
              <th scope="col">Candidate</th>
              <th scope="col">Email</th>
              <th scope="col">Date & Time</th>
              <th scope="col">Interviewers</th>
              <th scope="col">Interview Type</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentInterviews.map((interview, i) => {
              return (
                <InterviewList
                  interview={interview}
                  key={i}
                  openModal={openModal}
                  deleteHandler={deleteHandler}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <PaginationButton
        PerPage={interviewsPerPage}
        total={interviews.length}
        paginate={paginate}
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
      />
      {modalVisible && (
        <Modal
          show={modalVisible}
          onHide={() => setModalVisible(false)}
          size="md"
          className="modal-container"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h2>{!id ? "Schedule New Interview" : "Update Interview"}</h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              {errorSave && <ErrorAlert message={errorSave} />}

              <div className="row ">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Interview Type</label>
                    <select
                      className="form-control"
                      value={inttype}
                      onChange={(e) => setInttype(e.target.value)}
                    >
                      {interviewType.map((inttype) => {
                        return (
                          <option key={inttype} value={inttype}>
                            {inttype}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      placeholder="Enter Full Name"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Candidate Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Candidate Email</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="row ">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Interviewer</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Interviewer Name"
                      value={interviewer}
                      onChange={(e) => setInterviewer(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      className="form-control"
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-5 float-right"
              >
                {!id ? "Schedule Interview" : "Update Interview"}
              </button>
            </form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default InterviewListPage;
