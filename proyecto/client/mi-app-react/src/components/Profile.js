import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const { getProfile, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        setUser(profileData);
      } catch (err) {
        setError('Error loading profile');
      }
    };

    fetchProfile();
  }, [getProfile]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      setError('Error logging out');
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="profile-details">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
        <p><strong>Payment Methods:</strong> {user.payMethods}</p>
        <p><strong>Registration Date:</strong> {new Date(user.dateRegister).toLocaleDateString()}</p>
      </div>
      {error && <p className="error">{error}</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
