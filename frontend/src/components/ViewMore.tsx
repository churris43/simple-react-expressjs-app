interface ViewMoreProps {
  text: string;
  whenClicked: () => void;
  expanded: boolean;
}

function ViewMore(props: ViewMoreProps) {
  if (props.text.length < 90) return null;
  return (
    <button
      className="text-indigo-500 mb-5 hover:text-indigo-600"
      onClick={props.whenClicked}
    >
      {props.expanded ? "Less" : "More"}
    </button>
  );
}

export default ViewMore;
