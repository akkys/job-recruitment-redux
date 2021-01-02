import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/UserAction";
import { Link } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";
import ErrorAlert from "../../misc/ErrorAlert";

const RegisterPage = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [category, setCategory] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch();
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/login";

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      // cleanup
    };
  }, [userInfo, props.history, redirect]);
  console.log("user", userInfo);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      register(name, email, password, passwordCheck, companyName, category)
    );
    console.log(name, email, password, passwordCheck, companyName, category);
  };

  return loading ? (
    <LoadingPage />
  ) : (
    <div className="home-container container">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4" id="login-container">
          <h2>
            <i className="fa fa-user-plus" /> Register an Account
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
                type="text"
                className="form-control"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-users " />
                </span>
              </div>
              <select
                className="form-control"
                onChange={(e) => setCategory(e.target.value)}
                style={{ fontSize: "14px" }}
              >
                <option value="Candidate">Candidate</option>
                <option value="Employer">Employer</option>
              </select>
            </div>
            {category === "Employer" && (
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa fa-building fa-lg" />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  value={companyName}
                  name="companyName"
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="CompanyName"
                />
              </div>
            )}

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-envelope" />
                </span>
              </div>
              <input
                type="email"
                className="form-control"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
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
                value={passwordCheck}
                name="passwordCheck"
                onChange={(e) => setPasswordCheck(e.target.value)}
                placeholder="Re-enter Password"
              />
            </div>

            <button
              type="submit"
              className="btn btn-warning btn-block"
              id="add-cart"
            >
              Register
            </button>
            <h6 className="mt-4">Already have an account?</h6>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button
                id="create-acc"
                type="submit"
                className="btn btn-primary btn-block mt-4"
              >
                Sign-In
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
