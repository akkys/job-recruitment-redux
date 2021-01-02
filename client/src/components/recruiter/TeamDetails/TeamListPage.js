import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addTeam,
  listTeam,
  deleteTeam,
} from "../../../actions/Recruiter/TeamListAction";
import ErrorAlert from "../../../misc/ErrorAlert";
import PaginationButton from "../../layout/PaginationButton";
import LoadingPage from "../../pages/LoadingPage";
import TeamList from "./TeamList";

const TeamListPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEamil] = useState("");
  const [phone, setPhone] = useState("");
  const [roles, setRoles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [teamsPerPage] = useState(6);

  const teamList = useSelector((state) => state.teamList);
  const { teams, loading } = teamList;
  const teamAdd = useSelector((state) => state.teamAdd);
  const { success: successSave, error: errorSave } = teamAdd;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listTeam());
  }, [dispatch, successSave]);

  useEffect(() => {
    document.title = "Team Members | Job Recruitment";
    dispatch(listTeam());
  }, [dispatch]);
  console.log("Team", teams);

  useEffect(() => {
    async function getRole() {
      const roleData = await Axios.get("/addRole/");
      if (roleData.data.length > 0) {
        return (
          setRoles(roleData.data.map((r) => r.role)),
          setRole(roleData.data[0].role)
        );
      }
    }
    getRole();
    console.log(roles, role);
  }, []);

  const openModal = (team) => {
    if (team._id) {
      setModalVisible(true);
      setId(team._id);
      setName(team.name);
      setRole(team.role);
      setEamil(team.email);
      setPhone(team.phone);
    } else {
      setModalVisible(true);
      setId();
      setName();
      setRole();
      setEamil();
      setPhone();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const team = {
      _id: id,
      name,
      role,
      email,
      phone,
    };
    dispatch(addTeam(team));
    console.log(team);
  };

  const deleteHandler = (team) => {
    dispatch(deleteTeam(team._id));

    dispatch(listTeam());
  };

  //Pagination
  const indexOfLastTeam = currentPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  const currentTeams = teams.slice(indexOfFirstTeam, indexOfLastTeam);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < teams.length / teamsPerPage) {
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
          <h1>Team Members</h1>
        </div>
        <div className="col-md-2">
          <button
            onClick={() => openModal({})}
            className="btn btn-primary btn-lg btn-block"
          >
            Add Member
          </button>
        </div>
      </div>
      <h5 className="ml-1 mt-3" style={{ fontWeight: "500" }}>
        {currentTeams.length} of {teams.length} results.
      </h5>
      <div className="table-container">
        <h3>Team</h3>
        <p>Invite and manage team members</p>
        <div className="row">
          {currentTeams.map((team, i) => {
            return (
              <TeamList
                team={team}
                key={i}
                openModal={openModal}
                deleteHandler={deleteHandler}
              />
            );
          })}
        </div>
      </div>
      <PaginationButton
        PerPage={teamsPerPage}
        total={teams.length}
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
              <h2>{!id ? "Add New Team Member" : "Update Team Member"}</h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              {errorSave && <ErrorAlert message={errorSave} />}
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select
                  className="form-control"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  {roles.map((role, i) => {
                    return <option key={i}>{role}</option>;
                  })}
                </select>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEamil(e.target.value)}
                />
              </div>
              <div className="form-group mb-4">
                <label>Phone</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
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
    </div>
  );
};

export default TeamListPage;
