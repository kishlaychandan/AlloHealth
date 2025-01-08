'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const router = useRouter(); // For programmatic navigation

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    const res = await fetch('/api/doctors');
    const data = await res.json();
    setDoctors(data);
  };

  const deleteDoctor = async (id) => {
    await fetch(`/api/doctors/${id}`, { method: 'DELETE' });
    fetchDoctors(); // Refresh the list after deletion
  };

  const handleAddDoctor = () => {
    router.push('/doctors/add'); // Redirect to the "Add Doctor" page
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Doctors</h1>
        <button 
          onClick={handleAddDoctor}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Add Doctor
        </button>
      </div>

      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 text-sm font-semibold text-gray-700">Name</th>
            <th className="px-4 py-2 text-sm font-semibold text-gray-700">Specialization</th>
            <th className="px-4 py-2 text-sm font-semibold text-gray-700">Gender</th>
            <th className="px-4 py-2 text-sm font-semibold text-gray-700">Location</th>
            <th className="px-4 py-2 text-sm font-semibold text-gray-700">Availability</th>
            <th className="px-4 py-2 text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{doctor.name}</td>
              <td className="px-4 py-2">{doctor.specialization}</td>
              <td className="px-4 py-2">{doctor.gender}</td>
              <td className="px-4 py-2">{doctor.location}</td>
              <td className="px-4 py-2">{doctor.availability ? 'Available' : 'Not Available'}</td>
              <td className="px-4 py-2">
                <button 
                  onClick={() => deleteDoctor(doctor.id)} 
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
