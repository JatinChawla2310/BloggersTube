import React, { useState } from "react";
import BlogContext from "./blogContext";

const BlogState = (props) => {
  const host = "http://localhost:5000";
  const [blogs, setBlogs] = useState();

  // Fetch all blogs
  const getBlogs = async () => {
    const res = await fetch(`${host}/api/blogs/fetchblogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    setBlogs(json);    
  };

  // Add blog
  const addBlog = async (title, desc) => {
    const res = await fetch(`${host}/api/blogs/addblog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, desc }),
    });
    const json = await res.json();
    setBlogs(blogs.concat(json));
  };

  return (
    <BlogContext.Provider value={{ getBlogs, blogs, setBlogs, addBlog }}>
      {props.children}
    </BlogContext.Provider>
  );
};

export default BlogState;
