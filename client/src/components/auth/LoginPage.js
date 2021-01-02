import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../actions/UserAction";
import LoadingPage from "../pages/LoadingPage";
import { Link } from "react-router-dom";
import ErrorAlert from "../../misc/ErrorAlert";

const LoginPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/welcome";

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      // cleanup
    };
  }, [userInfo, props.history, redirect]);
  console.log("Data", userInfo);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
    console.log(email, password);
  };

  return loading ? (
    <LoadingPage />
  ) : (
    <div className="home-container container">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4" id="login-container">
          <h2>
            <i className="fa fa-user-circle" /> Sign-In
          </h2>

          <form onSubmit={handleSubmit} className="mt-5">
            {error && <ErrorAlert message={error} />}

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-user fa-lg" />
                </span>
              </div>
              <input
                type="email"
                className="form-control"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-lock fa-lg " />
                </span>
              </div>
              <input
                type="password"
                className="form-control"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                aria-label="Password"
                aria-describedby="basic-addon1"
              />
            </div>

            <button
              type="submit"
              className="btn btn-warning btn-block"
              id="add-cart"
            >
              Sign-In
            </button>
            <h6 className="mt-4">New to Job Recruitment?</h6>
            <Link
              to={
                redirect === "/" ? "register" : "register/redirect=" + redirect
              }
              style={{ textDecoration: "none" }}
            >
              <button type="submit" className="btn btn-primary btn-block mt-4">
                Register your account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
