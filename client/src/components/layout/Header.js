import React from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import NavAuthOption from "../auth/NavAuthOption";

const Header = () => {
  return (
    <div>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        fixed="top"
        style={{ fontWeight: "500" }}
      >
        <Navbar.Brand as={Link} to="/" className="mr-5">
          <h3 style={{ fontWeight: "bold" }}>JOB RECRUITMENT</h3>
          <small
            style={{ fontSize: "12px", float: "right", lineHeight: "0px" }}
          >
            Online Placement Service
          </small>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <NavAuthOption />
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
