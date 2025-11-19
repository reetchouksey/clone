import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import logo from "../../assets/nlogo.png";
import searchIcon from "../../assets/searchiconn.png";
import player from "../../assets/R.png";

import { logout } from "../../Firebase";

const Navbar = () => {
  const navRef = useRef(null);
  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [q, setQ] = useState("");

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

  const handleSearchClick = () => setSearchOpen(!searchOpen);
  const handleProfileClick = () => setProfileOpen(!profileOpen);

  const submitSearch = (e) => {
    e.preventDefault();
    const term = q.trim();
    if (!term) return;
    navigate(`/search?q=${encodeURIComponent(term)}`);
    setQ("");
  };

  return (
    <>
      <div ref={navRef} className="navbar">
        <div className="navbar-left">
          <img className="logo" src={logo} alt="Logo" />

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

        
          <div className="search-container">
            <img
              src={searchIcon}
              alt="Search Icon"
              className="search-icon"
              onClick={handleSearchClick}
            />

            <form
              className={`nav-search-form ${searchOpen ? "active" : ""}`}
              onSubmit={submitSearch}
            >
              <input
                className="nav-search-input"
                placeholder="Search movies..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
             
              <button type="submit" className="nav-search-button"></button>
            </form>
          </div>

          <p className="children-text"><b>Children</b></p>

          <div className="navbar-profile" onClick={handleProfileClick}>
            <img src={player} alt="Profile" className="profile" />
            {profileOpen && (
              <div className="dropdown">
                <p onClick={async () => { await logout(); navigate("/login"); }}>
                  Sign Out
                </p>
              </div>
            )}
          </div>

          <IconButton className="hamburger-btn" onClick={() => setDrawerOpen(true)}>
            <MenuIcon sx={{ color: "white", fontSize: 30 }} />
          </IconButton>
        </div>
      </div>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { width: "70%", backgroundColor: "#111", color: "white" }
        }}
      >
        <div className="drawer-header">
          <IconButton onClick={() => setDrawerOpen(false)}>
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
          <p onClick={async () => { await logout(); navigate("/login"); }}>
            <b>Sign Out</b>
          </p>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
