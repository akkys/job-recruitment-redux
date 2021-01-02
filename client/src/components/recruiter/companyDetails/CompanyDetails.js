import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addCompany,
  listCompany,
} from "../../../actions/Recruiter/CompanyAction";
import ErrorAlert from "../../../misc/ErrorAlert";
import LoadingPage from "../../pages/LoadingPage";
import CompanyProfile from "./CompanyProfile";

const CompanyDetails = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [street1, setStreet1] = useState("");
  const [street2, setStreet2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipcode, setZipcode] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const companyList = useSelector((state) => state.companyList);
  const { companies, loading } = companyList;

  const companyAdd = useSelector((state) => state.companyAdd);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = companyAdd;
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = `${userInfo.name} | Job Recruitment`;
    dispatch(listCompany());
  }, [dispatch]);
  console.log("Company", companies);

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listCompany());
    return () => {
      //   cleanup
    };
  }, [dispatch, successSave]);

  const openModal = (company) => {
    if (company._id) {
      setModalVisible(true);
      setId(company._id);
      setFullname(company.fullname);
      setEmail(company.email);
      setCategory(company.category);
      setStreet1(company.street1);
      setStreet2(company.street2);
      setCity(company.city);
      setState(company.state);
      setCountry(company.country);
      setZipcode(company.zipcode);
    } else {
      setModalVisible(true);
      setId();
      setFullname();
      setEmail();
      setCategory();
      setStreet1();
      setStreet2();
      setCity();
      setState();
      setCountry();
      setZipcode();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const company = {
      _id: id,
      fullname,
      email,
      category,
      street1,
      street2,
      city,
      state,
      country,
      zipcode,
    };
    dispatch(addCompany(company));
    console.log(company);
  };

  return loading ? (
    <LoadingPage />
  ) : (
    <div className="home-container container mb-5">
      <div className="row mb-3">
        <div className="col-md-10">
          {userInfo && <h1>{userInfo.companyName}</h1>}
        </div>
        <div className="col-md-2">
          {companies.length === 0 ? (
            <button
              onClick={() => openModal({})}
              className="btn btn-lg btn-primary "
            >
              Add Details
            </button>
          ) : (
            <>
              {companies.map((comp, i) => {
                return (
                  <button
                    key={i}
                    onClick={() => openModal(comp)}
                    className="btn btn-lg btn-success "
                  >
                    Update Details
                  </button>
                );
              })}
            </>
          )}
        </div>
      </div>
      {companies.map((comp, i) => {
        return <CompanyProfile comp={comp} key={i} />;
      })}
      {modalVisible && (
        <Modal
          show={modalVisible}
          onHide={() => setModalVisible(false)}
          size="lg"
          className="modal-container"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h2>{!id ? "Add Company Details" : "Update Company Details"}</h2>
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
                  placeholder="Enter Proprietor Full Name"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Category</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Company Category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter Proprietor Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Street Address Line1</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Street Address Line1 "
                      value={street1}
                      onChange={(e) => setStreet1(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Street Address Line2</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Street Address Line2"
                      value={street2}
                      onChange={(e) => setStreet2(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>State</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Country</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>ZipCode</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter ZipCode"
                      value={zipcode}
                      onChange={(e) => setZipcode(e.target.value)}
                    />
                  </div>
                </div>
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

export default CompanyDetails;
