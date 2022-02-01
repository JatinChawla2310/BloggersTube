import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Write.css";
import axios from "axios";

const Write = () => {
  let history = useNavigate();
  const [file, setFile] = useState(null);
  const checkLogin = () => {
    if (!localStorage.getItem("token")) {
      history("/login");
    }
  };
  const [data, setData] = useState({
    title: "",
    desc: "",
    photo: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const addPic = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const dataFile =new FormData();
      const filename = Date.now() + file.name;
      dataFile.append("name", filename);
      dataFile.append("file", file);
      data.photo = filename;       
      try {
        await axios.post("http://localhost:5000/api/upload", dataFile); 
      } catch (err) {
        console.log(err);
      }
    }
    const res = await fetch(`http://localhost:5000/api/blogs/addblog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ data }),
    });
    const json = await res.json();        
    window.location.replace("/post/" + json._id);
    setData({
      title: "",
      desc: "",
    });
    alert("Blog Added Successfully");
    history("/");
  };
  useEffect(() => {
    window.scroll(0,0)
    checkLogin(); 
    // eslint-disable-next-line   
  }, []);

  return (
    <div className="write">
      {file && (
        <img
          src={URL.createObjectURL(file)}
          alt="profile"
          className="writeImage"
        />
      )}
      <form
        className="writeForm"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            name="myFile"
            style={{ display: "none" }}
            onChange={addPic}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={handleChange}
            name="title"
            required
            minLength={3}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeText writeInput"
            cols="30"
            rows="10"
            onChange={handleChange}
            name="desc"
            required
            minLength={5}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
};

export default Write;
