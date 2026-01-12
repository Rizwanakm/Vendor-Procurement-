import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

const PurchaseOrders = () => {
  const [pos, setPos] = useState<any[]>([]);
  const [vendorInput, setVendorInput] = useState({} as Record<string, string>);

  const fetchPOs = async () => {
    const res = await api.get("/po", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setPos(res.data);
  };

  const markDelivered = async (id: string) => {
    await api.put(
      `/po/${id}/deliver`,
      {},
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    fetchPOs();
  };

  const assignVendor = async (id: string) => {
    const vendor = vendorInput[id];
    if (!vendor) return alert("Enter vendor name");
    await api.put(
      `/po/${id}/assign-vendor`,
      { vendor },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    setVendorInput({ ...vendorInput, [id]: "" });
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
            <p><b>PO Number:</b> {po.poNumber}</p>
            <p><b>Status:</b> {po.status}</p>

            {/* Loop all items */}
            {po.requestId?.items?.map((item: any, idx: number) => (
              <p key={idx}>
                Item: {item.itemName} | Quantity: {item.quantity}
              </p>
            ))}

            <p><b>Vendor:</b> {po.vendor || "Not Assigned"}</p>

            {/* Vendor assignment */}
            <input
              placeholder="Vendor name"
              value={vendorInput[po._id] || ""}
              onChange={(e) =>
                setVendorInput({ ...vendorInput, [po._id]: e.target.value })
              }
            />
            <button onClick={() => assignVendor(po._id)}>Assign Vendor</button>

            {/* Mark delivered */}
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
