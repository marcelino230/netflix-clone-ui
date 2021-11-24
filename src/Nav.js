import React, { useState, useEffect } from "react";
import Logo from "./assets/logo.png";
import Profile_logo from "./assets/profile__logo.png";
import "./Nav.css";
function Nav() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });

    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img className="nav_logo" src={Logo} alt="Logo" />
      <img className="nav_avater" src={Profile_logo} alt="Profile Logo" />
    </div>
  );
}

export default Nav;
