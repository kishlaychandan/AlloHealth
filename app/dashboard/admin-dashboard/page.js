'use client'; // Mark as a Client Component

import { useState, useEffect } from 'react';
import ProtectedRoute from "../../components/ProtectedRoute";
import { useRouter } from 'next/navigation';

const AdminDashboard = () => {
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the list of appointments and doctors
        const appointmentsRes = await fetch('/api/appointments/');
        const doctorsRes = await fetch('/api/doctors');

        const appointmentsData = await appointmentsRes.json();
        const doctorsData = await doctorsRes.json();

        // Set the length of the arrays
        setTotalAppointments(appointmentsData.length); // Get the length of the appointments array
        setTotalDoctors(doctorsData.length); // Get the length of the doctors array
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ProtectedRoute role="admin">
      <div className="bg-green-100 min-h-screen p-6">
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h2>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {/* Total Appointments */}
            <div className="bg-green-600 text-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold">Total Appointments</h3>
              <p className="text-3xl mt-2">{totalAppointments}</p>
            </div>

            {/* Total Doctors */}
            <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold">Total Doctors</h3>
              <p className="text-3xl mt-2">{totalDoctors}</p>
            </div>

            {/* Add Doctor Button */}
            <div className="bg-yellow-600 text-white p-6 rounded-lg shadow-md flex items-center justify-between">
              <h3 className="text-lg font-bold">Manage Doctors</h3>
              <button
                onClick={() => router.push('/doctors/add')}
                className="bg-white text-yellow-600 py-2 px-4 rounded-lg hover:bg-yellow-500 transition"
              >
                Add Doctor
              </button>
            </div>
          </div>

          {/* Appointment Management */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800">Manage Appointments</h3>
            <p className="text-gray-600 mt-2">Here you can view, approve, and manage appointments.</p>
            <button
              onClick={() => router.push('/appointments')}
              className="mt-4 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-500 transition"
            >
              View Appointments
            </button>
          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
