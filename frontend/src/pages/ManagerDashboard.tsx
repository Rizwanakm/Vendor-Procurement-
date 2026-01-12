import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

const ManagerDashboard = () => {
  const [requests, setRequests] = useState<any[]>([]);

  const fetchRequests = async () => {
    const res = await api.get("/requests", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setRequests(res.data);
  };

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    try {
      await api.put(
        `/requests/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchRequests();
    } catch (err: any) {
      alert(err.response?.data?.message || "Action failed");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px", minHeight: "80vh" }}>
        <h2>Manager Dashboard</h2>

        {requests
          .filter((r) => r.status === "pending")
          .map((r) => (
            <div key={r._id} style={styles.card}>
              <p>
                <b>Requested By:</b> {r.requestedBy?.name} <br />
                <b>Item:</b> {r.items[0]?.itemName} <br />
                <b>Quantity:</b> {r.items[0]?.quantity}
              </p>

              <button
                onClick={() => updateStatus(r._id, "approved")}
                style={styles.approve}
              >
                Approve
              </button>

              <button
                onClick={() => updateStatus(r._id, "rejected")}
                style={styles.reject}
              >
                Reject
              </button>
            </div>
          ))}
      </div>

      <Footer />
    </>
  );
};

const styles = {
  card: {
    background: "#ecfeff",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  approve: {
    marginRight: "10px",
    background: "green",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
  },
  reject: {
    background: "red",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
  },
};

export default ManagerDashboard;
