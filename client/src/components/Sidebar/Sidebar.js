import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="about">
        <span className="title">About Me</span>
        <img
          src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
          alt="profile"
        />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam nisi
          nesciunt ipsa pariatur iusto, ducimus tempore soluta, id, esse quis
          repudiandae dolorem at deserunt molestiae consequuntur eius illo? Vel
          accusamus distinctio natus a eligendi.
        </p>
      </div>
      <div className="social">
        <div className="socialTitle">
          <span className="title">Follow us</span>
        </div>
        <div className="socialIcon">
          <i className="fab fa-facebook"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-pinterest"></i>
          <i className="fab fa-instagram"></i>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
