import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-500 to-teal-500 text-white flex items-center justify-center px-4">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-8 text-gray-900">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-600">Get in Touch</h2>
        <p className="text-center mb-8">
          We’d love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to drop us a message.
        </p>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Your Message
            </label>
            <textarea
              id="message"
              placeholder="Write your message here"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-md font-semibold hover:bg-green-600 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
