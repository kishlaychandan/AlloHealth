'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddDoctorPage() {
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    gender: '',
    location: '',
    availability: true,
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch('/api/doctors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    router.push('/doctors'); // Redirect to the doctor list
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-50">
      <div className="p-6 bg-white shadow-md rounded-lg max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add Doctor</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Doctor's Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
          </div>
          
          {/* Specialization Input */}
          <div>
            <input
              type="text"
              name="specialization"
              placeholder="Specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
          </div>
          
          {/* Gender Dropdown */}
          <div>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Location Input */}
          <div>
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
          </div>

          {/* Availability Checkbox */}
          <div className="flex items-center space-x-2">
            <label htmlFor="availability" className="text-sm font-medium text-gray-700">
              Available:
            </label>
            <input
              type="checkbox"
              name="availability"
              checked={formData.availability}
              onChange={handleChange}
              id="availability"
              className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            Add Doctor
          </button>
        </form>
      </div>
    </div>
  );
}
