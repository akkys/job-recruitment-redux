import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const LandingPage = (props) => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/home";

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      // cleanup
    };
  }, [userInfo, props.history, redirect]);
  return (
    <div className="container home-container ">
      <div className="row" id="main-container">
        <div className="col-md-6" id="left-div-container">
          <h1>Employers</h1>
          <p>
            Find the most suitable candidates for any role using assessments
            based on real-world tasks.
          </p>

          <Link to="/register" style={{ textDecoration: "none" }}>
            <button className="btn btn-lg btn-dark btn-block">
              Sign-Up As EMPLOYER
            </button>
          </Link>
        </div>
        <div className="col-md-6" id="right-div-container">
          <h1>Candidates</h1>
          <p>
            Boost your carrier with genuine and reputed companies all over
            India. Register to know more.
          </p>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <button className="btn btn-lg btn-dark btn-block">
              Sign-Up As CANDIDATE
            </button>
          </Link>
        </div>

        <div className="container Emp-container mb-5">
          <h1>Drive Better Talent To The Right Place</h1>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
