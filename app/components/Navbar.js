'use client'; // Mark as a Client Component

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Import Link

const Navbar = () => {
  const [userRole, setUserRole] = useState('guest'); // Default role is 'guest'
  const router = useRouter();

  // Fetch user role on component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('User')); // Get user data from localStorage

    if (user) {
      setUserRole(user.role); // Set role to 'user' or 'admin'
    } else {
      setUserRole('guest'); // Default role is 'guest'
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('User'); // Clear user data from localStorage (using 'User' key)
    setUserRole('guest'); // Reset role to guest
    router.push('/login'); // Redirect to login page
  };

  // Dynamically set the logo link based on userRole
  const logoLink = () => {
    if (userRole === 'guest') return '/';
    if (userRole === 'User') return '/dashboard/user-dashboard';
    if (userRole === 'admin') return '/dashboard/admin-dashboard';
    return '/'; // For guest or default case
  };

  return (
    <nav className="bg-green-600 text-white px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <div
        className="text-xl font-bold cursor-pointer"
        onClick={() => router.push(logoLink())}
      >
        Appointment App
      </div>

      {/* Navigation Links */}
      <ul className="flex space-x-6">
        {userRole === 'guest' && (
          <>
            <li>
              <Link href="/login" className="hover:underline">Login</Link>
            </li>
            <li>
              <Link href="/signup" className="hover:underline">SignUp</Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">About</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">Contact</Link>
            </li>
          </>
        )}

        {userRole === 'User' && (
          <>
            <li>
              <Link href="/book-appointment" className="hover:underline">Book Appointment</Link>
            </li>
            <li>
              <Link href="/check-status" className="hover:underline">Check Status</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="hover:underline">Logout</button>
            </li>
          </>
        )}

        {userRole === 'admin' && (
          <>
            <li>
              <Link href="/appointments" className="hover:underline">View Appointments</Link>
            </li>
            <li>
              <Link href="/doctors" className="hover:underline">Add Doctor</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="hover:underline">Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
