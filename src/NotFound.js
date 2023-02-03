import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <p>Page Not Found</p>
      <Link to="/">Login Here</Link>
    </>
  );
};
export default NotFound;
