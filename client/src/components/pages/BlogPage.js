import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAllBlogs } from "../../actions/Recruiter/BlogAction";
import LoadingPage from "./LoadingPage";
import Blogs from "./Blogs";
import PaginationButton from "../layout/PaginationButton";

const BlogPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(5);

  const dispatch = useDispatch();
  const blogList = useSelector((state) => state.blogList);
  const { blogs, loading } = blogList;
  useEffect(() => {
    dispatch(listAllBlogs());
  }, [dispatch]);

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
    <div className="home-container container">
      <h1 className="mb-5">Blogs List</h1>
      <h5 className="ml-3 mt-3" style={{ fontWeight: "500" }}>
        {currentBlogs.length} of {blogs.length} results.
      </h5>
      {currentBlogs.map((blog, i) => {
        return <Blogs blog={blog} key={i} />;
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
    </div>
  );
};

export default BlogPage;
