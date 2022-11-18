import React from "react";
import "./NavBar.css";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate()

  const onLogOutBtn = ()=>{
    sessionStorage.removeItem("accessToken")

    navigate("/")  
  }

  const onMoveHomeBtn = () => {

    navigate("/main")
  }


  return (
    <div className="navBar-wrapper">
      <div className="nav-home-wrapper">
        <a onClick={onMoveHomeBtn}>Home</a>
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
        <a className="logout-btn" onClick={onLogOutBtn}>로그아웃</a>
      </div>
    </div>
  );
}

export default NavBar;
