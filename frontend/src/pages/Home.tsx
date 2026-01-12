import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center vh-100"
      style={{
        backgroundImage:
          "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))",
      }}
    >
      <h1 className="text-white mb-3">
        Vendor Procurement System
      </h1>

      <p className="text-white mb-4">
        Request → Approval → Purchase Order → Delivery
      </p>

      <div>
        <Link to="/" className="btn btn-light mx-2">
          Login
        </Link>

        <Link to="/register" className="btn btn-outline-light mx-2">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
