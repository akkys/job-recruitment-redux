import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addBlog,
  deleteBlog,
  listAllBlogs,
  listBlog,
} from "../../../actions/Recruiter/BlogAction";
import ErrorAlert from "../../../misc/ErrorAlert";
import PaginationButton from "../../layout/PaginationButton";
import LoadingPage from "../../pages/LoadingPage";
import BlogList from "./BlogList";

const BlogListPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(5);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const blogList = useSelector((state) => state.blogList);
  const { blogs, loading } = blogList;
  const blogAdd = useSelector((state) => state.blogAdd);
  const { success: successSave, error: errorSave } = blogAdd;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listBlog());
  }, [dispatch, successSave]);

  useEffect(() => {
    document.title = "Blogs | Job Recruitment";
    if (userInfo && userInfo.category === "Employer") {
      dispatch(listBlog());
    } else {
      dispatch(listAllBlogs());
    }
  }, [dispatch, userInfo]);
  console.log("Blogs", blogs);

  const openModal = (blog) => {
    if (blog._id) {
      setModalVisible(true);
      setId(blog._id);
      setName(blog.name);
      setTitle(blog.title);
      setDescription(blog.description);
    } else {
      setModalVisible(true);
      setId();
      setName();
      setTitle();
      setDescription();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = {
      _id: id,
      name,
      title,
      companyName,
      description,
    };
    dispatch(addBlog(blog));
    console.log(blog);
  };

  const deleteHandler = (blog) => {
    dispatch(deleteBlog(blog._id));

    dispatch(listBlog());
  };

  //Pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < blogs.length / blogsPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return loading ? (
    <LoadingPage />
  ) : (
    <>
      <div className="container home-container">
        <div className="row">
          <div className="col-md-10">
            {blogs.length === 0 ? (
              <div className="col-md-10 mb-3">
                <h1>No Blogs Added!</h1>
              </div>
            ) : (
              <div className="col-md-10 mb-3">
                <h1>Blogs List</h1>
              </div>
            )}
          </div>
          {userInfo.category === "Employer" && (
            <div className="col-md-2">
              <button
                onClick={() => openModal({})}
                className="btn btn-primary btn-lg btn-block"
              >
                Add Blog
              </button>
            </div>
          )}
        </div>
        <h5 className="ml-3 mt-3" style={{ fontWeight: "500" }}>
          {currentBlogs.length} of {blogs.length} results.
        </h5>
        {currentBlogs.map((blog, i) => {
          return (
            <BlogList
              blog={blog}
              userInfo={userInfo}
              key={i}
              openModal={openModal}
              deleteHandler={deleteHandler}
            />
          );
        })}
        <br />
        <PaginationButton
          PerPage={blogsPerPage}
          total={blogs.length}
          paginate={paginate}
          currentPage={currentPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
        {modalVisible && (
          <Modal
            show={modalVisible}
            onHide={() => setModalVisible(false)}
            size="md"
            className="modal-container"
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <h2>{!id ? "Add New Blog" : "Update Blog"}</h2>
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
                    placeholder="Enter Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Company Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Full Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Blog Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    type="text"
                    className="form-control"
                    rows="3"
                    placeholder="Enter Blog's Description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary mt-5 float-right"
                >
                  {!id ? "Add Blog" : "Update Blog"}
                </button>
              </form>
            </Modal.Body>
          </Modal>
        )}
      </div>
    </>
  );
};

export default BlogListPage;
