import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function useAuth(requiredRole = null) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        async function checkAuth() {
            const res = await fetch('/api/auth/me'); // API to check logged-in user
            if (res.ok) {
                const data = await res.json();
                setUser(data);

                if (requiredRole && data.role !== requiredRole) {
                    router.push('/unauthorized'); // Redirect non-admin users
                }
            } else {
                router.push('/signin'); // Redirect to login if not authenticated
            }
            setLoading(false);
        }

        checkAuth();
    }, [requiredRole, router]);

    return { user, loading };
}
