import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Link to="/">Home</Link>
      <br />
      <Link to="/applications">Applications</Link>
      <br />
      <Link to="/new">Add Application</Link>
      <br />
      <br />
    </>
  );
};

export default Navbar;
