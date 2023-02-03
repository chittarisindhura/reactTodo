const Input = ({ setTaskNameFunc, value }) => {
  return (
    <input
      className="input"
      type="text"
      value={value}
      onChange={(e) => setTaskNameFunc(e.target.value)}
    />
  );
};
export default Input;
