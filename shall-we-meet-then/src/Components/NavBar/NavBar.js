import React from 'react';
import './NavBar.css';


function NavBar() {
    return (
        <div className="nav">
            {/* <input type="checkbox" id="nav-check" /> */}
            <div className="nav-header">
                <div className="nav-title">
                    <a>Home</a>
                </div>
            </div>


            <div className="nav-links">
                <a>흐르는시간</a>
                <a>지나간시간</a>
                <a>로그아웃</a>
            </div>
        </div>
    )
}

export default NavBar