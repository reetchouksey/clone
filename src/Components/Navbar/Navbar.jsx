
import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";

import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import logo from "../../assets/nlogo.png";
import search from "../../assets/searchiconn.png";
import bell from "../../assets/BellIcon.png";
import player from "../../assets/R.png";

import { logout } from "../../Firebase";

const Navbar = () => {
  const navRef = useRef(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add("nav-dark");
      } else {
        navRef.current.classList.remove("nav-dark");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  return (
    <>
      <div ref={navRef} className="navbar">

        
        <div className="navbar-left">
          <img className="logo" src={logo} alt="Netflix Logo" />

          <ul className="desktop-menu">
            <li><b>Home</b></li>
            <li><b>TV Shows</b></li>
            <li><b>Movies</b></li>
            <li><b>New & Popular</b></li>
            <li><b>My List</b></li>
            <li><b>Browse by Languages</b></li>
          </ul>
        </div>

     
        <div className="navbar-right">

          <img src={search} alt="Search Icon" className="icon" />
          <p className="children-text"><b>Children</b></p>
          <img src={bell} alt="Notification Icon" className="icons" />

          <div className="navbar-profile">
            <img src={player} alt="User Profile" className="profile" />
            <div className="dropdown">
              <p onClick={() => logout()}>Sign Out</p>
            </div>
          </div>

         
          <IconButton className="hamburger-btn" onClick={() => toggleDrawer(true)}>
            <MenuIcon sx={{ color: "white", fontSize: 30 }} />
          </IconButton>

        </div>
      </div>

  
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
        PaperProps={{
          sx: { width: "70%", backgroundColor: "#111", color: "white" }
        }}
      >
        <div className="drawer-header">
          <IconButton onClick={() => toggleDrawer(false)}>
            <CloseIcon sx={{ color: "white", fontSize: 30 }} />
          </IconButton>
        </div>

        <div className="drawer-menu">
          <p><b>Home</b></p>
          <p><b>TV Shows</b></p>
          <p><b>Movies</b></p>
          <p><b>New & Popular</b></p>
          <p><b>My List</b></p>
          <p><b>Browse by Languages</b></p>
          <p onClick={() => logout()}><b>Sign Out</b></p>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
