import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./Navbar.css";
import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { auth } from "../firebase-config";


export default function Navbar() {
  const history = useNavigate();

  const logout = async () => {
    await signOut(auth);
    history("/");
  };
  
  function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });
    
    return (
      <li className={isActive ? "active" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    );
  }

  return (
    <div id="myDiv" style={{ backgroundColor: "#f1f4f9", color: "#f1f4f9" }}>
      <nav className="navbar">
        <div className="navbar-links">
          <h3 className="navbar-title">Poker Hub Elite</h3>
          <ul className="navbar-ul">
            <li>
              <NavLink to="/Home" id="home-tab">Home</NavLink>
            </li>
            <li>
              <NavLink to="/Coaches" id="coaches-tab">Coaches</NavLink>
            </li>
          </ul>
        </div>
        <button id="logout-button" className="logout-button" onClick={logout}>Logout</button>

      </nav>
    </div>
  );
}