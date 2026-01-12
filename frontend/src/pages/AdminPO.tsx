import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

interface PO {
  _id: string;
  poNumber: string;
  vendor?: string;
  status: "created" | "delivered";
  requestId: {
    items: { itemName: string; quantity: number }[];
  };
}

const AdminPO = () => {
  const [pos, setPos] = useState<PO[]>([]);

  const fetchPOs = async () => {
    const res = await api.get("/po", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setPos(res.data);
  };

  const assignVendor = async (id: string, vendor: string) => {
    await api.put(
      `/po/${id}/vendor`,
      { vendor },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
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

        {pos.map((po) => (
          <div key={po._id} style={styles.card}>
            <p><b>PO:</b> {po.poNumber}</p>
            <p>
              <b>Item:</b> {po.requestId?.items[0]?.itemName} |
              <b> Qty:</b> {po.requestId?.items[0]?.quantity}
            </p>

            <p><b>Status:</b> {po.status}</p>

            <select
              value={po.vendor || ""}
              onChange={(e) => assignVendor(po._id, e.target.value)}
            >
              <option value="">Assign Vendor</option>
              <option value="Vendor A">Vendor A</option>
              <option value="Vendor B">Vendor B</option>
              <option value="Vendor C">Vendor C</option>
            </select>

            {po.status === "created" && (
              <button onClick={() => markDelivered(po._id)}>
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
    marginBottom: "10px",
    borderRadius: "8px",
  },
};

export default AdminPO;
