import React from "react";

const TeamList = (props) => {
  const { team, openModal, deleteHandler } = props;
  return (
    <div className="col-md-4 mb-5">
      <div class="card">
        <div className="card-body-container">
          <h4 className="card-title">{team.name}</h4>
          <hr />
          <h6 className="card-subtitle mb-2 text-muted">Details</h6>
          <h5>{team.role}</h5>

          <h6>{team.email}</h6>
          <h6>{team.phone}</h6>

          <button
            onClick={() => openModal(team)}
            className="btn btn-success btn-sm mt-3"
          >
            Edit
          </button>
          <button
            onClick={() => {
              deleteHandler(team);
            }}
            className="btn btn-danger btn-sm mt-3 float-right"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamList;
