import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../api";
import "./Register.css";

function Register() {
  const [form, setForm] = useState({
    name:"",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    debugger
      const res = await API.post("/users/register-user", form);
      alert("Registered successfully!");
     localStorage.setItem("token", res.data.access_token);
      navigate("/task");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Register</h2>

        <form className="register-form" onSubmit={handleSubmit}>
          <input
            className="register-input"
            type="text"
            placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
 
          <input
            className="register-input"
            type="email"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            className="register-input"
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button className="register-button" type="submit">
            Register
          </button>
        </form>

        <p className="register-text">
          Already have an account?{" "}
          <Link className="register-link" to="/">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
