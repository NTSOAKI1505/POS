import "./navbar.css";
import React from "react";
import Logo from "./assets/logo.jpg";

function navbar(){
    return(
        <nav className="navbar">
        <h1>Wings Cafe</h1>
        <img
          src={Logo} 
          alt="Ntsoaki Kasa"
          className="profile-pic"
        />
        </nav>

    );
}
export default navbar;