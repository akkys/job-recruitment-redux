import React from "react";

const Experience = (props) => {
  const { experience, openModal, openDeleteModal } = props;
  console.log("Exp", experience);

  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
  });
  const fromDt = experience.fromDate;
  const fromDate = formatter.format(Date.parse(fromDt));

  const toDt = experience.toDate;
  const toDate = formatter.format(Date.parse(toDt));

  return (
    <div className="row mb-4">
      <div className="col-md-1"></div>
      <div className="col-md-10">
        <h6>
          {experience.cmpName}

          <span
            className="float-right"
            style={{ cursor: "pointer" }}
            onClick={() => openDeleteModal(experience._id)}
          >
            Remove
          </span>
          <span
            className="mr-3 float-right"
            style={{ cursor: "pointer" }}
            onClick={() => openModal(experience)}
          >
            Edit
          </span>
        </h6>
        <h5>
          {experience.role}{" "}
          <span>
            {fromDate} - {toDate}
          </span>
        </h5>{" "}
        <p>{experience.description}</p>
      </div>
    </div>
  );
};

export default Experience;
