// src/pages/NotFound.js
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound(){
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow text-center">
        <h1 className="text-3xl font-bold">404</h1>
        <p className="mt-2">Page not found</p>
        <Link to="/" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded">Go home</Link>
      </div>
    </div>
  );
}
