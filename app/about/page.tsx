import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-green-400 text-white flex items-center justify-center px-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 text-gray-900">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">About Us</h1>
        <p className="text-lg mb-6 text-center">
          Welcome to our platform! We are committed to delivering exceptional solutions and services that make a positive impact.
        </p>
        <div className="space-y-8">
          {/* Mission Section */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-500 mb-3">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              Our mission is to empower individuals and businesses with innovative, high-quality solutions tailored to meet their needs.
              We believe in driving success through collaboration, creativity, and dedication.
            </p>
          </div>

          {/* Vision Section */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-500 mb-3">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              To be a leader in our industry by setting standards of excellence and innovation, while creating a meaningful impact in the
              community and inspiring growth for everyone we serve.
            </p>
          </div>

          {/* Key Highlights */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-500 mb-3">Why Choose Us?</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Experienced professionals dedicated to your success</li>
              <li>Commitment to quality and innovation</li>
              <li>Customer-focused approach</li>
              <li>Comprehensive solutions tailored to your needs</li>
              <li>Proven track record of excellence</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
