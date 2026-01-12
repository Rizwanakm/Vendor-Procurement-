import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

const PurchaseOrders = () => {
  const [pos, setPos] = useState<any[]>([]);
  const [vendor, setVendor] = useState("");

  const fetchPOs = async () => {
    try {
      const res = await api.get("/po", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setPos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const assignVendor = async (id: string) => {
    if (!vendor) return alert("Enter vendor name");
    await api.put(
      `/po/${id}/assign-vendor`,
      { vendor },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    setVendor("");
    fetchPOs();
  };

  const markDelivered = async (id: string) => {
    await api.put(
      `/po/${id}/deliver`,
      {},
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    fetchPOs();
  };

  useEffect(() => {
    fetchPOs();
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>Purchase Orders</h2>

        {pos.length === 0 && <p>No Purchase Orders created yet.</p>}

        {pos.map((po) => (
          <div key={po._id} style={styles.card}>
            <p><b>PO Number:</b> {po.poNumber}</p>
            <p><b>Status:</b> {po.status}</p>
            <p>
              <b>Item:</b> {po.requestId?.items?.[0]?.itemName} | Qty:{" "}
              {po.requestId?.items?.[0]?.quantity}
            </p>
            <p><b>Vendor:</b> {po.vendor || "Not Assigned"}</p>

            <input
              placeholder="Vendor name"
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
            />
            <button onClick={() => assignVendor(po._id)}>Assign Vendor</button>

            {po.status !== "delivered" && (
              <button style={styles.deliver} onClick={() => markDelivered(po._id)}>
                Mark Delivered
              </button>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

const styles = {
  card: {
    background: "#f8fafc",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "12px",
  },
  deliver: {
    background: "green",
    color: "white",
    border: "none",
    padding: "6px 10px",
    marginTop: "8px",
    borderRadius: "5px",
  },
};

export default PurchaseOrders;
