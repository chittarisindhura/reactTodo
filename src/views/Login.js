import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("/login", { username: email, password })
      .then((response) => {
        const users = response.data;
        //   dispatch(loginSuccess(users));
        localStorage.setItem("auth", true);
        localStorage.setItem("jwt", users.auth_token);
        localStorage.setItem("user", JSON.stringify(users));
        // console.log("users", users); // undefined
        return navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });

    // if (res.status === 200) {
    //   // console.log(res.data.name);
    //   localStorage.setItem("auth", true);
    //   return navigate("/dashboard");
    // }
  };
  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="form-input"
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="form-input"
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="form-btn">Login</button>
        <p>
          Not Registered <Link to="/register">Register Now</Link>
        </p>
      </form>
    </div>
  );
};
export default Login;
