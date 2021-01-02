import React from "react";

const BlogList = (props) => {
  const { blog, userInfo, openModal, deleteHandler } = props;
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  const created = blog.createdAt;
  const createdDate = formatter.format(Date.parse(created));

  return (
    <div className="job-container container">
      <p>
        {blog.title}{" "}
        {userInfo.category === "Employer" && (
          <>
            <small
              className=" text-default ml-3 float-right"
              style={{ cursor: "pointer" }}
              onClick={() => openModal(blog)}
            >
              Edit
            </small>
            <small
              className=" text-default ml-3 float-right"
              onClick={() => deleteHandler(blog)}
            >
              Remove
            </small>
          </>
        )}
      </p>

      <h5 className="ml-4">{blog.description}</h5>

      <small className="mr-3">
        Posted By : {blog.name} | {blog.companyName}
      </small>

      <small className="float-right">Posted At : {createdDate}</small>
    </div>
  );
};

export default BlogList;
