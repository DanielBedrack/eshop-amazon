import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Store } from '../Context/Store';

const UpdateUserForm = () => {
  const {
    state: { userInfo },
  } = useContext(Store);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object with the updated user data
    const updatedUser = {
      name,
      email,
      password,
    };
    console.log(JSON.stringify(updatedUser));

    try {
      // Send a PUT request to the backend to update the user
      const response = await axios.put('/api/v1/users/update', updatedUser, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h2 className="title">Update User</h2>
      {message && <div className="alert">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateUserForm;
