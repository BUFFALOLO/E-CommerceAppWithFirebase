import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const UserProfile = () => {
  const { currentUser, userProfile, updateUserProfile, deleteUserAccount } = useAuth();
  const [editableProfile, setEditableProfile] = useState({
    name: '',
    address: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (userProfile) {
      setEditableProfile({
        name: userProfile.name || '',
        address: userProfile.address || '',
      });
    }
  }, [userProfile]);

  const handleChange = (e) => {
    setEditableProfile({
      ...editableProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setError(null);
    setSuccessMessage(null);
    try {
      await updateUserProfile(editableProfile);
      setSuccessMessage('Profile updated successfully.');
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile: ' + err.message);
    }
  };

  const handleDeleteAccount = async () => {
    setError(null);
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await deleteUserAccount();
        alert('Account deleted successfully.');
        // Optionally redirect or update UI after deletion
      } catch (err) {
        setError('Failed to delete account: ' + err.message);
      }
    }
  };

  if (!currentUser) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <div>
        <label>
          Name:
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editableProfile.name}
              onChange={handleChange}
            />
          ) : (
            <span> {userProfile?.name || 'N/A'}</span>
          )}
        </label>
      </div>
      <div>
        <label>
          Address:
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={editableProfile.address}
              onChange={handleChange}
            />
          ) : (
            <span> {userProfile?.address || 'N/A'}</span>
          )}
        </label>
      </div>
      {isEditing ? (
        <button onClick={handleSave}>Save</button>
      ) : (
        <button onClick={() => setIsEditing(true)}>Edit Profile</button>
      )}
      <hr />
      <button onClick={handleDeleteAccount} style={{ color: 'red' }}>
        Delete Account
      </button>
    </div>
  );
};

export default UserProfile;
