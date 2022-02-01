import React from "react";
import SinglePost from "../SinglePost/SinglePost";
import "./Posts.css";

const Posts = ({ blogs }) => {
  return (
    <div className="posts">
      <span className="postsBlog">Blogs</span>
      <div className="singlePosts">
        {blogs &&
          blogs.map((b) => {
            return <SinglePost key={blogs._id} blogs={b} />;
          })}
      </div>
    </div>
  );
};

export default Posts;
