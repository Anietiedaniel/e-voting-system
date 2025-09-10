// src/components/Navbar.js
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl text-gray-800">ElectionApp</Link>

        <div className="flex items-center space-x-4">
          <Link to="/elections" className="text-gray-600 hover:text-gray-800">Elections</Link>
          {user ? (
            <>
              {user.role === "admin" && <Link to="/admin" className="text-gray-600 hover:text-gray-800">Admin</Link>}
              {user.role === "chairman" && <Link to="/chairman" className="text-gray-600 hover:text-gray-800">Chairman</Link>}
              {user.role === "voter" && <Link to="/voter" className="text-gray-600 hover:text-gray-800">Vote</Link>}
              <span className="px-3 py-1 bg-gray-100 rounded">{user.name}</span>
              <button onClick={onLogout} className="btn px-3 py-1 bg-red-500 text-white rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/voter-login" className="text-gray-600 hover:text-gray-800">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
