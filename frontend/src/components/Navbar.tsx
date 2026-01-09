import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const linkClass = ({ isActive }: { isActive: boolean }): string =>
    isActive ? "bg-black text-white" : "bg-white text-black";

  return (
    <>
      <NavLink to="/" className={linkClass}>
        Home
      </NavLink>
      <br />
      <NavLink to="/applications" className={linkClass}>
        Applications
      </NavLink>
      <br />
      <NavLink to="/new" className={linkClass}>
        Add Application
      </NavLink>
      <br />
      <br />
    </>
  );
};

export default Navbar;
