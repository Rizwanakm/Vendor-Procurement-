import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PurchaseOrders from "./pages/PurchaseOrders"; // ✅ IMPORTANT
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPO from "./pages/AdminPO";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN PO PAGE */}
        <Route
          path="/admin/po"
          element={
            <ProtectedRoute role="admin">
              <PurchaseOrders />
            </ProtectedRoute>
          }
        />
        <Route
  path="/admin/po"
  element={
    <ProtectedRoute role="admin">
      <AdminPO />
    </ProtectedRoute>
  }
/>

        <Route
          path="/employee"
          element={
            <ProtectedRoute role="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager"
          element={
            <ProtectedRoute role="manager">
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
