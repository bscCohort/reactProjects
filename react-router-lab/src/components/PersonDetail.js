// src/components/PersonDetail.js

import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Notification from './Notification';

import '../styles/PersonDetail.css'; // Component-specific styles

const API_URL = process.env.REACT_APP_API_URL;

const PersonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState(null);
  const [showNotification, setShowNotification] = useState(null);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        console.log('Fetching person data...');
        const response = await axios.get(`${API_URL}/${id}`);
        console.log('Person data:', response.data);
        setPerson(response.data);
      } catch (error) {
        console.error('Error fetching person:', error.response || error.message);
        setShowNotification({ type: 'error', text: 'Error loading person details.' });
      }
    };
    fetchPerson();
  }, [id]);

  const deletePerson = async () => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setShowNotification({ type: 'success', text: 'Person deleted successfully!' });
      setTimeout(() => navigate('/'), 3000); // Navigate after showing notification for 3 seconds
    } catch (error) {
      console.error('Error deleting person:', error);
      setShowNotification({ type: 'error', text: 'Error deleting person.' });
    }
  };

  const handleCloseNotification = () => {
    setShowNotification(null);
  };

  if (!person && !showNotification) {
    return <div className="box-container">Loading...</div>;
  }

  if (!person && showNotification) {
    return <div className="box-container">Error loading person details.</div>;
  }

  return (
    <div className="box-container">
      <h1>{person.name}</h1>
      <div className="person-info">
        <p>Age: {person.age}</p>
      </div>
      <div className="person-actions">
        <Link to={`/edit/${person.id}`} className="btn btn-update">Edit</Link>
        <button onClick={deletePerson} className="btn btn-delete">Delete</button>
        <Link to="/" className="btn btn-back">Back to Home</Link>
      </div>
      {showNotification && <Notification message={showNotification} onClose={handleCloseNotification} />}
    </div>
  );
};

export default PersonDetail;
