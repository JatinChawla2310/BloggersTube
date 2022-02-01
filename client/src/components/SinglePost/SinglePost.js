import React from "react";
import "./SinglePost.css";
import { Link } from "react-router-dom";

const SinglePost = ({ blogs }) => {
  const PF = "http://localhost:5000/images/";
  return (
    <div className="singlePost">
      {blogs.photo && <img src={PF + blogs.photo} alt="blog post" />}
      <Link to={`/post/${blogs._id}`} className="link-router">
        <div className="blog">
          <div className="postTitle">
            <span className="singlePostTitle">{blogs.title}</span>
            <p>{new Date(blogs.date).toDateString()}</p>
          </div>
          <div className="desc">
            <p>{blogs.desc} </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SinglePost;
