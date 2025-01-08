'use client';

import { useState } from 'react';

export default function SignupPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('User registered successfully');
    } else {
      setMessage(data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-300 to-red-500">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-400 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-400 focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-400 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-400 transition"
          >
            Sign Up
          </button>
        </form>
        {message && (
          <p
            className={`text-center mt-4 ${
              message.includes('successfully') ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
