import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getError } from '../Utils';
import axios from 'axios';
import Title from '../Components/Shared/Title';

function ResetPasswordPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const token = new URLSearchParams(search).get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords must match!');
      return;
    }

    try {
      const { data } = await axios.put('/api/v1/users/reset-password', {
        password,
        token,
      });

      toast.success(data.message);
      navigate('/signin');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Container className="small-container">
      <Title title="Reset Password" />
      <h1 className="my-3 title">Reset Password</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Reset Password</Button>
        </div>
        <div className="mb-3">
          Remember your password? <Link to="/signin">Sign in</Link>
        </div>
      </Form>
    </Container>
  );
}

export default ResetPasswordPage;
