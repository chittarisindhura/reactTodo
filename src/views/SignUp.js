import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const baseUrl = "https://drab-teal-moose-tutu.cyclic.app";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    const ApiUrl = `${baseUrl}/register`;

    e.preventDefault();
    if (password === confirmPassword) {
      const res = await axios.post(ApiUrl, { name, email, password });
      // console.log(res);
      if (res.status === 200) {
        return navigate("/");
      }
    }
  };
  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="form-input"
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
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
        <input
          className="form-input"
          type="password"
          value={confirmPassword}
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="form-btn">Submit</button>
        <p>
          Already Registered <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
};
export default SignUp;
