import React from "react";
import ImageCarousel from "./ImageCarousel";

const AboutUsPage = () => {
  return (
    <div className="container home-container">
      <ImageCarousel />
      <h2 className="mt-3" style={{ textAlign: "center" }}>
        Welcome to JobSource. Now you can explore your Dream with us.
      </h2>
      <div className="jumbotron jumbo-container mt-5">
        <h1>Our Mission</h1>
        <h2>
          Our mission has been to help both Recruiters and Candidates what they
          are looking for.
        </h2>
      </div>
    </div>
  );
};

export default AboutUsPage;
