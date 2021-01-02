import React from "react";
import { useSelector } from "react-redux";
import { Nav, Navbar, NavDropdown, Dropdown, Form } from "react-bootstrap";
import LoadingPage from "../pages/LoadingPage";
import Cookie from "js-cookie";
import { Link } from "react-router-dom";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

const NavAuthOption = () => {
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo } = userSignin;

  const logOut = (e) => {
    e.preventDefault();
    Cookie.remove("userInfo");
    window.location.href = "/login";
  };

  return loading ? (
    <LoadingPage />
  ) : (
    <>
      {userInfo ? (
        <>
          {userInfo.category === "Employer" ? (
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <Nav.Link as={Link} className="mr-3 " to="/home">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} className="mr-3" to="/blogsList">
                  Blogs
                </Nav.Link>
                <NavDropdown
                  title="Solutions"
                  className="mr-3"
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/employerDetails">
                    For Employers
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/agenciesDetails">
                    For Agencies
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/integrationDetails">
                    Compliance & Integrations
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Dropdown className="mr-2">
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  <span
                    className="mr-1"
                    style={{ fontWeight: "520", fontSize: "14px" }}
                  >
                    <i className="fa fa-user-circle-o fa-lg mr-2" />
                    {userInfo.name}
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Header>Company Details</Dropdown.Header>
                  <Dropdown.Item as={Link} to="/companyDetails">
                    Company Profile
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/teamList">
                    Team
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Header>Job Details</Dropdown.Header>
                  <Dropdown.Item as={Link} to="/interviewList">
                    Live Interviews
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/jobList">
                    Jobs
                  </Dropdown.Item>
                  <Dropdown.Divider />

                  <Dropdown.Item>
                    <span className="text-danger" onClick={logOut}>
                      Logout
                    </span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Collapse>
          ) : (
            <>
              <Navbar.Collapse className="justify-content-end">
                <Nav>
                  <Nav.Link as={Link} className="mr-3" to="/jobList">
                    Jobs
                  </Nav.Link>
                  <Nav.Link as={Link} className="mr-3" to="/blogsList">
                    Blogs
                  </Nav.Link>
                  <Dropdown className="mr-2">
                    <Dropdown.Toggle
                      variant="default"
                      className="text-light"
                      id="dropdown-basic"
                    >
                      <span className="mr-1">
                        <i className="fa fa-user-circle-o fa-lg mr-2" />
                        {userInfo.name}
                      </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Header>Profile Details</Dropdown.Header>
                      <Dropdown.Item as={Link} to="/candidateProfile">
                        Profile
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <DropdownItem>
                        <span className="text-danger" onClick={logOut}>
                          Logout
                        </span>
                      </DropdownItem>
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav>
              </Navbar.Collapse>
            </>
          )}
        </>
      ) : (
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link as={Link} className="mr-3" to="/aboutUs">
              About Us
            </Nav.Link>
            <Nav.Link as={Link} className="mr-3" to="/allBlogsList">
              Blogs
            </Nav.Link>
          </Nav>
          <Form inline>
            <Link to="/register" className="btn btn-primary btn-sm mr-3">
              Register
            </Link>
            <Link to="/login" className="btn btn-success btn-sm">
              Sign-In
            </Link>
          </Form>
        </Navbar.Collapse>
      )}
    </>
  );
};

export default NavAuthOption;
