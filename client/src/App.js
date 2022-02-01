import React, { useState } from "react";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Settings from "./pages/Settings/Settings";
import SinglePostPage from "./pages/SinglePostPage/SinglePostPage";
import Write from "./pages/Write/Write";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogState from "./context/BlogState";
import "./App.css";

const App = () => {
  const [profilePicChange, setProfilePicChange] = useState(null);
  const getPicData = (value) => {
    setProfilePicChange(value);
  };
  return (
    <>
      <BlogState>
        <Router>
          <Navbar profilePicChange={profilePicChange} />
          <Routes>
            <Route exact path="/" element={<Home getPicData={getPicData} />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/settings/:userId" element={<Settings />} />
            <Route exact path="/write" element={<Write />} />
            <Route exact path="/post/:postId" element={<SinglePostPage />} />
          </Routes>
          <Footer />
        </Router>
      </BlogState>
    </>
  );
};

export default App;
