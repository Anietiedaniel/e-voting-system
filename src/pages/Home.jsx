// src/pages/HomePage.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="bg-purple-700 text-white shadow">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-bold text-2xl cursor-pointer">
            <Link to="/">eVoting</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/#" className="hover:text-purple-200">About</Link>
            <Link to="/#" className="hover:text-purple-200">Contact</Link>
            <Link to="/#" className="hover:text-purple-200">FAQ</Link>
            <Link to="/#" className="hover:text-purple-200">Features</Link>
            <Link to="/#" className="hover:text-purple-200">Team</Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-purple-600 text-white px-6 py-4 flex flex-col gap-2">
            <Link to="/#" onClick={() => setMenuOpen(false)}>About</Link>
            <Link to="/#" onClick={() => setMenuOpen(false)}>Contact</Link>
            <Link to="/#" onClick={() => setMenuOpen(false)}>FAQ</Link>
            <Link to="/#" onClick={() => setMenuOpen(false)}>Features</Link>
            <Link to="/#" onClick={() => setMenuOpen(false)}>Team</Link>
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-500 to-purple-800 text-white flex flex-col md:flex-row items-center justify-between py-24 px-6">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Secure & Transparent <span className="text-yellow-300">Voting</span>
          </h1>
          <p className="mb-6 text-lg md:text-xl text-purple-100">
            Our mission is to make elections <strong>trustworthy, inclusive, and tamper-proof</strong>. 
            With real-time monitoring and secure encryption, your vote always counts.
          </p>
          <div className="flex gap-4">
            <Link to="/login" className="px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg hover:bg-purple-100 transition">Login</Link>
            <Link to="/register" className="px-6 py-3 bg-purple-900 text-white font-semibold rounded-lg hover:bg-purple-800 transition">Register</Link>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src="https://cdn.pixabay.com/photo/2014/03/25/15/20/ballot-296577_1280.png"
            alt="Ballot being cast into a ballot box"
            className="w-72 h-auto drop-shadow-xl"
          />
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What We Offer</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg flex flex-col items-center transition">
            <i className="fas fa-shield-alt text-purple-600 text-4xl mb-3"></i>
            <h3 className="font-semibold text-lg mb-2">Secure Platform</h3>
            <p className="text-gray-600 text-center">
              All votes are encrypted and stored securely to prevent tampering.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg flex flex-col items-center transition">
            <i className="fas fa-info-circle text-purple-600 text-4xl mb-3"></i>
            <h3 className="font-semibold text-lg mb-2">Transparent</h3>
            <p className="text-gray-600 text-center">
              Real-time voting info ensures a completely transparent process.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg flex flex-col items-center transition">
            <i className="fas fa-users text-purple-600 text-4xl mb-3"></i>
            <h3 className="font-semibold text-lg mb-2">Community Driven</h3>
            <p className="text-gray-600 text-center">
              Engage and participate in a system that empowers all citizens.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-20 bg-purple-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-purple-800 mb-8">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
              <i className="fas fa-lock text-purple-600 text-3xl mb-3"></i>
              <h4 className="font-semibold mb-2">End-to-End Encryption</h4>
              <p className="text-gray-600">Your vote is encrypted at the source and verified securely.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
              <i className="fas fa-clock text-purple-600 text-3xl mb-3"></i>
              <h4 className="font-semibold mb-2">Real-Time Results</h4>
              <p className="text-gray-600">Monitor elections live as results update instantly.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
              <i className="fas fa-globe text-purple-600 text-3xl mb-3"></i>
              <h4 className="font-semibold mb-2">Accessible Anywhere</h4>
              <p className="text-gray-600">Vote securely from any device, anytime, anywhere.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-700 text-white py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm">
          &copy; {new Date().getFullYear()} eVoting. All rights reserved. | Secure. Transparent. Reliable.
        </div>
      </footer>
    </div>
  );
}
