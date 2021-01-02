import React from "react";

const ErrorAlert = (props) => {
  return (
    <>
      <div className="alert alert-danger alert-dismissible " role="alert">
        {props.message}
        {/* <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
          onClick={props.clearError}
        >
          <span aria-hidden="true">&times;</span>
        </button> */}
      </div>
    </>
  );
};

export default ErrorAlert;
