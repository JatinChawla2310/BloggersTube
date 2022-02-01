import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({profilePicChange}) => {
  let history = useNavigate();
  let user = false;
  if (localStorage.getItem("token")) {
    user = true;
  } else {
    user = false;
  }
  const id = localStorage.getItem("id");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    history("/login");
  };

  return (
    <>
      <nav className="navbar">
        <div className="leftContent">
          <Link className="link" to="/"> <span>Bloggers tube</span></Link>
        </div>
        <div className="centerContent">
          <div className="centerContentItem">
            <ul className="listContainer">
              <li>
                <Link className="link" to="/">
                  Home
                </Link>
              </li>              
              <li>
                <Link className="link" to="/write">
                  Write
                </Link>
              </li>
              {user && (
                <li>
                  <Link className="link" to="/" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="rightContent">
          {user ? (
            <Link to={`/settings/${id}`}>
              {profilePicChange ? (
                <img src={profilePicChange} alt="profile" />
              ) : (
                <img
                  src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt="profile"
                />
              )}
            </Link>
          ) : (
            <>
              <li>
                <Link className="link" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="link" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
