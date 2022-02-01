import "./Settings.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Settings = () => {
  let history = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [file, setFile] = useState(null);
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    profilePic: "",
  });
  const checkLogin = () => {
    if (!localStorage.getItem("token")) {
      history("/login");
    }
  };

  const getUserData = async (id) => {
    const res = await fetch(`http://localhost:5000/api/user/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await res.json();    
    const { username, email,profilePic } = json;
    setCredentials({
      username,
      email,
      profilePic
    });
  };

  const addProfilePic = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const dataFile = new FormData();
      const filename = Date.now() + file.name;
      dataFile.append("name", filename);
      dataFile.append("file", file);
      credentials.profilePic = filename;
      try {
        await axios.post("http://localhost:5000/api/upload", dataFile);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await fetch(
        `http://localhost:5000/api/user/updateuser/${path}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({credentials}),
        }
      );
      const json = await res.json();
      if (json.success) {
        alert("Data updated successfully!");
        history("/");
      } else {
        alert("Data not updated");
      }
    } catch (error) {
      alert("Some error occurred");
    }
  };

  const deleteAccount = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/user/deleteuser/${path}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const json = await res.json();
      if (json.success) {
        alert("Account Deleted Successfully!");
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        history("/login");
      } else {
        alert("Deletion Failed");
      }
    } catch (error) {
      alert("Error occurred");
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    window.scroll(0,0)
    checkLogin();
    getUserData(path);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="settings">
      <div className="settingsLeft">
        <div className="setingsLeftHeader">
          <h1>Update Your Account</h1>
          <p onClick={deleteAccount}>Delete Account</p>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="profile">
            {file ? (
              <img src={URL.createObjectURL(file)} alt="profile" />
            ) : (
              <img
                src={
                  "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                }
                alt="profile"
              />
            )}
            <label htmlFor="chooseProfile">
              <i class="profileIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              style={{ display: "none" }}
              id="chooseProfile"
              onChange={addProfilePic}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="XYZ"
            value={credentials.username}
            onChange={handleChange}
            required
            minLength={3}
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            placeholder="abc@test.com"
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
            minLength={5}
          />
          <button className="updateButton" type="submit">
            Submit
          </button>
        </form>
      </div>
      <div className="settingsRight">
        <Sidebar />
      </div>
    </div>
  );
};

export default Settings;
