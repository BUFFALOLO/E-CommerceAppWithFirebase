import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const UserProfile = () => {
  const { currentUser, updateUserProfile, deleteUserAccount } = useAuth();
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.displayName || '');
    }
  }, [currentUser]);

  const handleUpdate = async () => {
    try {
      await updateUserProfile({ displayName });
      alert('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        await deleteUserAccount();
        alert('Account deleted successfully!');
      } catch (err) {
        setError('Failed to delete account. Please try again.');
      }
    }
  };

  return (
    <div>
      <h1>User Profile</h1>
      {error && <p className="text-danger">{error}</p>}
      <p>Email: {currentUser?.email}</p>
      <div>
        <label>
          Display Name:
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
        <button onClick={handleUpdate}>Update</button>
      </div>
      <button onClick={handleDeleteAccount} className="btn btn-danger">
        Delete Account
      </button>
    </div>
  );
};

export default UserProfile;
