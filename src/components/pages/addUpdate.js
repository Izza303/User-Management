import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './addupdate.css';
import { toast } from 'react-toastify';

const initialState = {
  name: '',
  email: '',
  contact: '',
};

const AddUpdate = () => {
  const [state, setState] = useState(initialState);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id]);

  const getSingleUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user/${id}`);
      if (response.status === 200) {
        console.log('Single user data:', response.data[0]);
        setState({ ...response.data[0] });
      }
    } catch (error) {
      console.error('Error fetching single user:', error);
    }
  };

  const addContact = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/user', data);
      if (response.status === 200) {
        toast.success(response.data);
      } else {
        toast.error('Failed to add contact');
      }
      return response.data;
    } catch (error) {
      toast.error('An error occurred while adding contact');
      console.error('Error adding contact:', error);
      throw error;
    }
  };

  const updateContact = async (data, id) => {
    try {
      const response = await axios.put(`http://localhost:5000/user/${id}`, data);
      if (response.status === 200) {
        toast.success(response.data);
      } else {
        toast.error('Failed to update contact');
      }
    } catch (error) {
      toast.error('An error occurred while updating contact');
      console.error('Error updating contact:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!state.name || !state.email || !state.contact) {
      toast.error('Please provide values for all input fields');
    } else {
      try {
        if (!id) {
          await addContact(state);
        } else {
          updateContact(state, id);
        }
        navigate('/');
      } catch (error) {
        console.error('Error in handleSubmit:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div style={{ marginTop: '100px' }}>
      <form
        style={{
          margin: 'auto',
          padding: '15px',
          maxWidth: '400px',
          alignContent: 'center',
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter name..."
          value={state.name}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter email..."
          value={state.email}
          onChange={handleInputChange}
        />
        <label htmlFor="contact">Contact</label>
        <input
          type="number"
          id="contact"
          name="contact"
          placeholder="Enter contact no..."
          value={state.contact}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? 'Update' : 'Add'} />
      </form>
    </div>
  );
};

export default AddUpdate;
