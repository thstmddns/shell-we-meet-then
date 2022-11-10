import React from "react";
import "./NavBar.css";
import styled from "styled-components";

function NavBar() {
  return (
    <div className="navBar-wrapper">
      <div className="nav-home-wrapper">
        <a>Home</a>
      </div>

      <div className="nav-time-wrapper">
        <div className="dropdown">

          <div className="dropdown-content">

          </div>
        </div>

        <div className="dropdown">
  
          <div className="dropdown-content">

          </div>
        </div>
      </div>

      <div className="nav-logout-wrapper">
        <a className="logout-btn">로그아웃</a>
      </div>
    </div>
  );
}

export default NavBar;
