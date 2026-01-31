import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

// Determine API Base URL
// In development, we use proxy in vite.config.js to handle CORS and cookies
// In production, we are on the same origin.
const API_BASE = import.meta.env.DEV ? '' : window.location.origin;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Use axios with direct URL and credentials support
                const response = await axios.get(`${API_BASE}/auth/me`, {
                    withCredentials: true // Important for sending cookies
                });

                if (response.data.success) {
                    setUser(response.data.user);
                }
            } catch (error) {
                // Silence errors for not-logged-in state (401/403)
                // or legitimate network errors. 
                // We just leave user as null.
                if (error.response && error.response.status !== 401) {
                    console.error("Error checking auth status:", error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const logout = async () => {
        try {
            await axios.post(`${API_BASE}/auth/logout`, {}, {
                withCredentials: true
            });
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            setUser(null);
            // Redirect to home page (Admin Panel)
            // Use window.location.replace to prevent back-button loops
            window.location.href = API_BASE;
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        console.warn("useAuth must be used within an AuthProvider");
        return { user: null, loading: false, logout: () => { } };
    }
    return context;
};

