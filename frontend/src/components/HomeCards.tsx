import React from "react";
import Card from "./Card";

function HomeCards() {
  return (
    <>
      <Card borderRadius="border-dashed">
        <h2>For Developers</h2>
        <p> Browse Jobs </p>
        <button>Browse Jobs</button>
      </Card>
      <Card>
        <h2>For Employers</h2>
        <p> Add a Job </p>
        <button>Add Jobs</button>
      </Card>
    </>
  );
}

export default HomeCards;
