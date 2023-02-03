const Button = ({ buttonClass, labelText, handleClick }) => {
  let buttonClassName;
  if (buttonClass === "delete") {
    buttonClassName = "trash";
  } else if (buttonClass === "save") {
    buttonClassName = "floppy-disk";
  } else if (buttonClass === "edit") {
    buttonClassName = "pen-to-square";
  } else if (buttonClass === "undo") {
    buttonClassName = "rotate-right";
  } else if (buttonClass === "cancel") {
    buttonClassName = "xmark";
  } else if (buttonClass === "done") {
    buttonClassName = "square-check";
  }
  return (
    <button className="btn" onClick={handleClick}>
      {labelText ? (
        labelText
      ) : (
        <i className={`fa-solid fa-${buttonClassName}`}></i>
      )}
    </button>
  );
};
export default Button;
