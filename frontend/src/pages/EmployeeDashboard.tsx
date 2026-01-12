import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

const EmployeeDashboard = () => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState<number>(1);

  const handleCreateRequest = async () => {
    if (!itemName || quantity <= 0) {
      alert("Please enter valid item name and quantity");
      return;
    }

    try {
      await api.post(
        "/requests",
        {
          items: [
            {
              itemName,
              quantity,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("✅ Purchase request created successfully");
      setItemName("");
      setQuantity(1);
    } catch (err: any) {
      alert(err.response?.data?.message || "❌ Failed to create request");
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h2>Employee Dashboard</h2>

        <div style={styles.card}>
          <h3>Create Purchase Request</h3>

          <input
            style={styles.input}
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />

          <input
            style={styles.input}
            type="number"
            min={1}
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />

          <button style={styles.button} onClick={handleCreateRequest}>
            Create Request
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

const styles = {
  container: {
    padding: "20px",
    minHeight: "80vh",
  },
  card: {
    background: "#f1f5f9",
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "400px",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default EmployeeDashboard;
