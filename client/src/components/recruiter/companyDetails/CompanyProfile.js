import React from "react";

const CompanyProfile = (props) => {
  const { comp } = props;
  return (
    <div className="row mt-5">
      <div className="col-sm-1"></div>
      <div className="col-md-10 comp-container">
        <h3 className="ml-3">{comp.fullname}</h3>
        <i className="fa fa-circle-o mr-2 ml-5" />
        Founder
        <div className="row">
          <div className="col-md-6">
            <h5 className="mt-4">Location:</h5>
            <span className="ml-4">{comp.city}</span>
            <h5 className="mt-4">Business Category:</h5>
            <span className=" ml-4 mb-3">{comp.category}</span>
            <h5 className="mt-4">Email Address:</h5>
            <span className="ml-4">{comp.email}</span>
          </div>
          <div className="col-md-6">
            <h5 className="mt-4">Office Address:</h5>
            <p className="ml-4">
              {comp.street1},<br />
              <span className="">
                {comp.street2},<br /> <span>{comp.city} - </span>
                <span>{comp.zipcode},</span>
                <br /> <span>{comp.state}, </span>
                <span className="mr-1">{comp.country}.</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
