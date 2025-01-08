"use client";

import { useState } from "react";

const DoctorSearchForm = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    specialization: "",
    location: "",
    availability: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 bg-gray-100 rounded-lg">
      <input
        type="text"
        name="specialization"
        placeholder="Specialization"
        value={filters.specialization}
        onChange={handleInputChange}
        className="p-2 border rounded"
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={filters.location}
        onChange={handleInputChange}
        className="p-2 border rounded"
      />
      <select
        name="availability"
        value={filters.availability}
        onChange={handleInputChange}
        className="p-2 border rounded"
      >
        <option value="">Availability</option>
        <option value="true">Available</option>
        <option value="false">Unavailable</option>
      </select>
      <button type="submit" className="p-2 text-white bg-blue-500 rounded">
        Search
      </button>
    </form>
  );
};

export default DoctorSearchForm;
