'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [status, setStatus] = useState(''); // Status filter
  const [doctorFilter, setDoctorFilter] = useState(''); // Doctor filter
  const [patientFilter, setPatientFilter] = useState(''); // Patient filter
  const [newDate, setNewDate] = useState(''); // Rescheduling date
  const [error, setError] = useState(null);
  const [isRescheduling, setIsRescheduling] = useState(null); // To track which appointment is being rescheduled
  const router = useRouter();

  useEffect(() => {
    // Fetch all appointments when the page loads
    const fetchAppointments = async () => {
      try {
        const response = await fetch('/api/appointments'); // Adjust if needed
        const data = await response.json();
        setAppointments(data);
      } catch (err) {
        setError('Error fetching appointments');
      }
    };

    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const updatedAppointment = await response.json();

      if (response.ok) {
        setAppointments((prev) =>
          prev.map((appointment) =>
            appointment.id === id ? updatedAppointment : appointment
          )
        );
      } else {
        setError('Error updating status');
      }
    } catch (err) {
      setError('Error updating status');
    }
  };

  const handleReschedule = async (id) => {
    if (!newDate) {
      setError('Please select a new date');
      return;
    }
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Rescheduled', newDate }),
      });

      const updatedAppointment = await response.json();

      if (response.ok) {
        setAppointments((prev) =>
          prev.map((appointment) =>
            appointment.id === id ? updatedAppointment : appointment
          )
        );
        setIsRescheduling(null); // Close the date input
        setNewDate(''); // Reset the new date
      } else {
        setError('Error rescheduling appointment');
      }
    } catch (err) {
      setError('Error rescheduling appointment');
    }
  };

  const filteredAppointments = appointments.filter(
    (appointment) =>
      (status ? appointment.status === status : true) &&
      (doctorFilter ? appointment.doctor.name.includes(doctorFilter) : true) &&
      (patientFilter ? appointment.patient.name.includes(patientFilter) : true)
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Appointments</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="space-y-4 mb-6">
        <div>
          <label className="mr-2">Filter by Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">All Statuses</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Rescheduled">Rescheduled</option>
          </select>
        </div>

        <div>
          <label className="mr-2">Filter by Doctor</label>
          <input
            type="text"
            placeholder="Doctor's Name"
            value={doctorFilter}
            onChange={(e) => setDoctorFilter(e.target.value)}
            className="px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="mr-2">Filter by Patient</label>
          <input
            type="text"
            placeholder="Patient's Name"
            value={patientFilter}
            onChange={(e) => setPatientFilter(e.target.value)}
            className="px-4 py-2 border rounded-md"
          />
        </div>
      </div>

      <div>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Doctor</th>
              <th className="px-4 py-2 border">Patient</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Issue</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
          {filteredAppointments.map((appointment) => (
  <tr key={appointment.id}>
    <td className="px-4 py-2 border text-black">{appointment.doctor?.name}</td> {/* Ensure text color is black */}
    <td className="px-4 py-2 border text-black">{appointment.patient?.name}</td> {/* Ensure text color is black */}
    <td className="px-4 py-2 border">{new Date(appointment.date).toLocaleString()}</td>
    <td className="px-4 py-2 border">{appointment.issue || 'No Issue'}</td>
    <td className="px-4 py-2 border">{appointment.status}</td>
    <td className="px-4 py-2 border">
  <select
    value={appointment.status}
    onChange={(e) => {
      const newStatus = e.target.value;
      handleUpdateStatus(appointment.id, newStatus);
      if (newStatus === 'Rescheduled') {
        setIsRescheduling(appointment.id); // Trigger date picker for rescheduling
      } else {
        setIsRescheduling(null); // Hide date picker if status is not Rescheduled
      }
    }}
    className="px-4 py-2 border rounded-md"
  >
    <option value="Scheduled">Scheduled</option>
    <option value="Confirmed">Confirmed</option>
    <option value="Pending">Pending</option>
    <option value="Cancelled">Cancelled</option>
    <option value="Rescheduled">Rescheduled</option>
  </select>
  {isRescheduling === appointment.id && appointment.status === 'Rescheduled' && (
    <div className="mt-2">
      <input
        type="date"
        value={newDate}
        onChange={(e) => setNewDate(e.target.value)}
        className="px-4 py-2 border rounded-md"
      />
      <div className="flex justify-between mt-2">
        <button
          onClick={() => setIsRescheduling(null)} // Close the date picker
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
        >
          Cancel
        </button>
        <button
          onClick={() => handleReschedule(appointment.id)} // Confirm reschedule
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Reschedule
        </button>
      </div>
    </div>
  )}
</td>

  </tr>
))}


          </tbody>
        </table>
      </div>

      {/* Reschedule modal */}
      {isRescheduling && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-1/3">
            <h2 className="text-xl mb-4">Select New Appointment Date</h2>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="px-4 py-2 border rounded-md mb-4 w-full"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setIsRescheduling(null)} // Close the modal
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReschedule(isRescheduling)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Reschedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;
