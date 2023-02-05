import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const baseUrl = "https://drab-teal-moose-tutu.cyclic.app";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ApiUrl = `${baseUrl}/login`;

    const res = await axios.post(ApiUrl, { username: email, password });
    // .then((response) => {
    //   const users = response.data;
    //   //   dispatch(loginSuccess(users));
    //   // console.log("users", users); // undefined
    //   localStorage.setItem("jwt", users.auth_token);
    //   localStorage.setItem("user", JSON.stringify(users));

    // })
    // .catch((error) => {
    //   console.log(error);
    // });
    // console.log(res);

    if (res.status === 200) {
      const users = res.data;
      localStorage.setItem("user", JSON.stringify(users));
      // console.log(res.data.name);
      localStorage.setItem("auth", true);
      return navigate("/dashboard");
    }
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
