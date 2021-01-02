import React from "react";
import { Link } from "react-router-dom";

const InterviewList = (props) => {
  const { interview, openModal, deleteHandler } = props;

  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  const created = interview.date;
  const createdDate = formatter.format(Date.parse(created));

  return (
    <tr className="table-secondary">
      <th scope="row">{interview.name}</th>
      <td>{interview.email}</td>
      <td>{createdDate}</td>
      <td>{interview.interviewer}</td>
      <td>{interview.inttype}</td>
      <td>
        {interview.status === "Completed" ? (
          <span className="text-danger">{interview.status}</span>
        ) : (
          <span className="text-success">{interview.status}</span>
        )}{" "}
      </td>
      <td>
        <i
          onClick={() => openModal(interview)}
          className="fa fa-pencil-square-o fa-lg mr-3 text-success"
        />

        <i
          onClick={() => {
            deleteHandler(interview);
          }}
          className="fa fa-times fa-lg text-danger"
        />
      </td>
    </tr>
  );
};

export default InterviewList;
