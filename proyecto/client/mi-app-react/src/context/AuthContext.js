
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (name, age, email, phoneNumber, password, payMethods) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        name,
        age,
        email,
        phoneNumber,
        password,
        payMethods,
      });
      setUser(response.data.user); // Assuming the API returns the created user data
    } catch (err) {
      throw err; // Rethrow error to be handled in the component
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
