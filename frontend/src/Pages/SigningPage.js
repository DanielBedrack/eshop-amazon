import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getError } from '../Utils';
import { Store } from '../Context/Store';
import Title from '../Components/Shared/Title';
import SignInForm from '../Components/SignInForm';
//import { toast } from 'react-toastify'

const SigningPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/api/v1/users/signin', {
        email,
        password,
      });

      ctxDispatch({ type: 'USER_SIGNIN', payload: data });

      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      alert(getError(err));
      // toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container className="small-container">
      <Title title="Sign-In" />
      <h1 className="my-3">Sign In</h1>
      <SignInForm
        submitHandler={submitHandler}
        setEmail={setEmail}
        setPassword={setPassword}
        redirect={redirect}
      />
    </Container>
  );
};

export default SigningPage;
