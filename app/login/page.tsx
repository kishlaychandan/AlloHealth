'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:any) => {
    console.log("test");
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
  
    const data = await res.json();
  
    if (res.ok) {
      setMessage('Login successful');
      // Save the full user data (including token and role) under 'User'
      console.log("data????");
      console.log("data>>",data);
      
      localStorage.setItem('User', JSON.stringify({ token: data.token, role: data.role, id: data.id }));
  
      console.log('Role:', data.role);
      
      // Redirect based on role
      if (data.role === 'admin') {
        router.push('/dashboard/admin-dashboard'); // Redirect to Admin Dashboard
      } else if (data.role === 'User') {
        router.push('/dashboard/user-dashboard'); // Redirect to User Dashboard
      } else {
        setMessage('Invalid role. Contact support.');
      }
    } else {
      setMessage(data.error || 'Login failed. Please try again.');
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-400"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message === 'Login successful'
                ? 'text-green-500'
                : 'text-red-500'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
