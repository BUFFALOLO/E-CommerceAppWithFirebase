import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase'; // Updated import path
import Dropdown from 'react-bootstrap/Dropdown';

const UserDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <Dropdown onToggle={() => setShowDropdown(!showDropdown)} show={showDropdown}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        User
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item as={NavLink} to="/profile">Profile</Dropdown.Item> {/* Updated link */}
        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserDropdown;
