'use client'; // Mark as a Client Component

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const BookAppointment = () => {
  const [doctorId, setDoctorId] = useState('');
  const [patientId, setPatientId] = useState(''); // Fetch patientId from localStorage
  const [date, setDate] = useState('');
  const [issue, setIssue] = useState(''); // New state for the issue
  const [rescheduledDate, setRescheduledDate] = useState(''); // New state for rescheduled date
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch list of doctors from the API
    const fetchDoctors = async () => {
      try {
        const response = await fetch('/api/doctors'); // Adjust this endpoint as needed
        const result = await response.json();
        setDoctors(result);
      } catch (err) {
        console.error('Error fetching doctors:', err);
      }
    };

    fetchDoctors();

    // Fetch patientId from localStorage (assuming User object is stored)
    const user = JSON.parse(localStorage.getItem('User')); // Assuming User is stored as an object
    console.log("user ><><", user);
    
    if (user && user.id) {
      setPatientId(user.id); // Retrieve patientId from localStorage
    } else {
      console.error('Patient ID not found in localStorage');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Input validation
    if (!doctorId || !patientId || !date) {
      setError('All fields are required');
      return;
    }
  
    try {
      // Convert doctorId to an integer before sending to the API
      const doctorIdInt = parseInt(doctorId, 10);
  
      // Check if the doctorId is valid (i.e., it's a number and not NaN)
      if (isNaN(doctorIdInt)) {
        setError('Invalid doctor ID');
        return;
      }

      const appointmentData = {
        doctorId: doctorIdInt,
        patientId,
        date,
        issue,
      };

      // Include rescheduledDate if it's set
      if (rescheduledDate) {
        appointmentData.rescheduledDate = rescheduledDate;
      }
  
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setSuccess('Appointment booked successfully!');
        router.push('/check-status'); // Redirect to check status page
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('An error occurred while booking the appointment');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Book Appointment</h1>
      
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="doctorId" className="block text-sm font-semibold">Select Doctor</label>
          <select
            id="doctorId"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="">Select a Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} - {doctor.specialization}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-semibold">Appointment Date</label>
          <input
            type="datetime-local"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="rescheduledDate" className="block text-sm font-semibold">Rescheduled Date (Optional)</label>
          <input
            type="datetime-local"
            id="rescheduledDate"
            value={rescheduledDate}
            onChange={(e) => setRescheduledDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="issue" className="block text-sm font-semibold">Issue / Reason for Appointment</label>
          <textarea
            id="issue"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            placeholder="Describe your issue or reason for the appointment"
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md">
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;
