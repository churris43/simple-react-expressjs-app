import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

function NotFoundPage() {
  return (
    <>
      <FaExclamationTriangle className="text-yellow-400 text-6xl mb-4" />
      <h1>Page Not found</h1>
      <br />
      <br />
      <Link to="/">Go Back</Link>
    </>
  );
}

export default NotFoundPage;
