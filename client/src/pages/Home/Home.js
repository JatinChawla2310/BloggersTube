import React, { useContext, useEffect } from "react";
import Posts from "../../components/Posts/Posts";
import blogContext from "../../context/blogContext";

const Home = ({ getPicData }) => {
  const context = useContext(blogContext);
  const { blogs, getBlogs } = context;
  let changedPic;
  const path = localStorage.getItem("id");
  const PF = "http://localhost:5000/images/";
  const getUserData = async (id) => {
    const res = await fetch(`http://localhost:5000/api/user/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await res.json();
    if (json.profilePic) {
      changedPic = PF + json.profilePic;      
      getPicData(changedPic);
    }
  };
  useEffect(() => {
    window.scroll(0, 0);
    if (localStorage.getItem("token")) {
      getUserData(path);
    }
    getBlogs();
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ marginBottom: "20px" }}>
      <Posts blogs={blogs} />
    </div>
  );
};

export default Home;
