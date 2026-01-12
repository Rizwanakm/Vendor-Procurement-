import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      alert(`Logged in as ${res.data.role}`);

      if (res.data.role === "employee") {
        window.location.href = "/employee";
      } else if (res.data.role === "manager") {
        window.location.href = "/manager";
      } else {
        window.location.href = "/admin";
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage:
          "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))",
      }}
    >
      <div className="bg-white p-4 rounded shadow" style={{ width: "400px" }}>
        <h2 className="text-center text-primary mb-4">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <p className="text-center mt-3">
          New user? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
