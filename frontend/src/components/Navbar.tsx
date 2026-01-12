import { Link } from "react-router-dom";

const Navbar = () => {
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={styles.nav}>
      <h3 style={{ color: "white" }}>Vendor Procurement</h3>

      <div style={styles.links}>
        {role === "employee" && <Link to="/employee">Employee</Link>}
        {role === "manager" && <Link to="/manager">Manager</Link>}
        {role === "admin" && <Link to="/admin">Admin</Link>}
        {role === "admin" && <Link to="/admin/po">Purchase Orders</Link>}


        <button onClick={logout} style={styles.btn}>
          Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    backgroundColor: "#2563eb",
  },
  links: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  btn: {
    background: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Navbar;
