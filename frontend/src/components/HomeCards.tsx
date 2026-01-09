import Card from "./Card";

function HomeCards() {
  return (
    <>
      <Card borderRadius="border-dashed">
        <h2>For Developers</h2>
        <p> Browse Applications </p>
        <button>Browse Applications</button>
      </Card>
      <Card>
        <h2>For Employers</h2>
        <p> Add an Applications </p>
        <button>Add Applications</button>
      </Card>
    </>
  );
}

export default HomeCards;
