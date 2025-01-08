'use client'; // Mark this file as a Client Component

import { useRouter } from 'next/navigation'; // Use next/navigation
import { useEffect } from 'react';

const ProtectedRoute = ({ role, children }) => {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('User'));
    // console.log("user", user);
    
    if (!user || user.role !== role) {
        console.log("user", user,"role", role);
        
      router.push('/login'); // Redirect to login if user is not authorized
    }
  }, [role, router]);

  return <>{children}</>; // Render children if authorized
};

export default ProtectedRoute;
