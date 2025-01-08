'use client'; // Mark as a Client Component

import { useState, useEffect } from 'react';

const CheckStatus = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('/api/appointments');
        const result = await response.json();

        if (response.ok) {
          setAppointments(result);
        } else {
          setError(result.error || 'Failed to fetch appointments');
        }
      } catch (error) {
        setError('An error occurred while fetching appointments');
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Check Appointment Status</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {appointments.length === 0 ? (
        <div>No appointments found</div>
      ) : (
        <ul className="space-y-4">
          {appointments.map((appointment) => (
            <li key={appointment.id} className="p-4 border rounded-md">
              <h3 className="font-semibold">Appointment ID: {appointment.id}</h3>
              <p><strong>Doctor:</strong> {appointment.doctor.name}</p>
              <p><strong>Patient:</strong> {appointment.patient.name}</p>
              <p><strong>Date:</strong> {new Date(appointment.date).toLocaleString()}</p>
              <p><strong>Status:</strong> {appointment.status || 'Pending'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CheckStatus;
