import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

const AdminDashboard = () => {
  const [approvedRequests, setApprovedRequests] = useState<any[]>([]);

  const fetchApprovedRequests = async () => {
    const res = await api.get("/requests", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setApprovedRequests(
      res.data.filter((r: any) => r.status === "approved")
    );
  };

  const createPO = async (requestId: string) => {
    try {
      const res = await api.post(
        "/po/create",
        { requestId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("PO Created: " + res.data.poNumber);
      fetchApprovedRequests();
    } catch (err: any) {
      alert(err.response?.data?.message || "PO creation failed");
    }
  };

  useEffect(() => {
    fetchApprovedRequests();
  }, []);

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px", minHeight: "80vh" }}>
        <h2>Admin Dashboard</h2>

        {approvedRequests.length === 0 && <p>No approved requests</p>}

        {approvedRequests.map((r) => (
          <div key={r._id} style={styles.card}>
            <p>
              <b>Item:</b> {r.items[0]?.itemName} <br />
              <b>Quantity:</b> {r.items[0]?.quantity}
            </p>

            <button onClick={() => createPO(r._id)}>
              Create Purchase Order
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
    background: "#fff7ed",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "10px",
  },
};

export default AdminDashboard;
