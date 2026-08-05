import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setLoading(false);
      } else {
        api.get('/dashboard/user')
          .then((res) => {
            setUser(res.data.user);
            localStorage.setItem('user', JSON.stringify(res.data.user));
          })
          .catch(() => {
            logout();
          })
          .finally(() => setLoading(false));
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (payload) => {
    const response = await api.post('/auth/login', payload);
    const { token, user: authUser } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(authUser));
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    setUser(authUser);
    return authUser;
  };

  const register = async (payload) => {
    const response = await api.post('/auth/register', payload);
    const { token, user: authUser } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(authUser));
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    setUser(authUser);
    return authUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common.Authorization;
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
