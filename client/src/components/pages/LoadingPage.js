import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingPage = () => {
  return (
    <div
      className="main-container"
      style={{ textAlign: "center", fontWeight: "bold" }}
    >
      <h2>
        Loading...{" "}
        <span style={{ fontSize: "13px" }}>
          <Spinner animation="border" role="status" />
        </span>
      </h2>

      {/* <Spinner animation="grow" role="status"></Spinner>
      <Spinner animation="grow" role="status"></Spinner> */}
      <h4>Please Wait...</h4>
    </div>
  );
};

export default LoadingPage;
