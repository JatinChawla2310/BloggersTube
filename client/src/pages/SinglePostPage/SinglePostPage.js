import React, { useEffect, useState } from "react";
import "./SinglePostPage.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SinglePostPage = () => {
  const PF = "http://localhost:5000/images/"
  var modal = document.getElementById("myModal");
  const [blog, setBlog] = useState([]);
  const [updatedBlog, setUpdatedBlog] = useState([]);
  const history = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const getBlog = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/blogs/getblog/${path}`
    );
    setBlog(res.data);
    setUpdatedBlog(res.data);
  };

  const openModal = () => {
    modal.style.display = "block";
  };

  const editBlog = async (e) => {
    e.preventDefault();
    try {
      const { title, desc } = updatedBlog;
      const res = await fetch(
        `http://localhost:5000/api/blogs/updateblog/${path}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ title, desc }),
        }
      );
      modal.style.display = "none";
      getBlog();
    } catch (error) {
      alert("Error occured");      
      modal.style.display = "none";
    }
  };

  const onChange = (e) => {
    setUpdatedBlog({ ...updatedBlog, [e.target.name]: e.target.value });
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  const deleteBlog = async () => {
    if (blog.user === localStorage.getItem("id")) {
      const res = await axios.delete(
        `http://localhost:5000/api/blogs/deleteblog/${path}`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      alert("Deleted successfully");
      history("/");
    } else {
      alert("Not allowed");
    }
  };
  useEffect(() => {
    window.scroll(0,0)
    getBlog();    
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <div className="singlePostPage">
        <div className="left">
          <div className="image">
            {blog.photo && <img src={PF+blog.photo} alt="blog post" />}
          </div>
          <div className="content">
            <div className="contentHeader">
              <span>{blog.title}</span>
              {blog.user === localStorage.getItem("id") && (
                <div className="delEdit">
                  {/* Modal */}
                  <div id="myModal" className="modal">
                    <div className="modal-content">
                      <form className="updateForm">
                        <h1>Edit Your Blog</h1>
                        <input
                          type="text"
                          name="title"
                          placeholder="Title"
                          value={updatedBlog.title}
                          onChange={onChange}
                        />
                        <textarea
                          name="desc"
                          placeholder="Tell your story..."
                          cols="30"
                          rows="10"
                          value={updatedBlog.desc}
                          onChange={onChange}
                        ></textarea>
                        <button onClick={editBlog}>Edit Blog</button>
                      </form>
                    </div>
                  </div>
                  {/* Modal ends */}
                  <i className="far fa-edit" id="myBtn" onClick={openModal}></i>
                  <i className="far fa-trash-alt" onClick={deleteBlog}></i>
                </div>
              )}
            </div>
            <div className="author">              
              <p>{new Date(blog.date).toDateString()}</p>
            </div>
            <div className="contentDesc">
              <p>{blog.desc}</p>
            </div>
          </div>
        </div>
        <div className="right">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
