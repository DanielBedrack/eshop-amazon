// import ReactDOM from 'react-dom/client';
import axios from 'axios';
import App from './App';
import ReactDOM from 'react-dom/client';
import React, {
  useEffect,
  useReducer,
  useContext,
  useState,
  createContext,
} from 'react';
import {
  useParams,
  useNavigate,
  useLocation,
  Link,
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import {
  GET_SUCCESS,
  GET_FAIL,
  GET_REQUEST,
  ADD_TO_CART,
  USER_SIGNIN,
  REMOVE_FROM_CART,
  USER_SIGNOUT,
  SAVE_PAYMENT_METHOD,
  CREATE_FAILED,
  CREATE_REQUEST,
  CREATE_SUCCEEDED,
  CLEAR_CART,
  SAVE_SHIPPING_ADDRESS,
} from './Actions';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import NavBar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { LinkContainer } from 'react-router-bootstrap';
import Loading from './Components/Shared/Loading';
import MessageBox from './Components/Shared/MessageBox';
import Footer from './Components/Shared/Footer';
import Navbar from './Components/Shared/NavBar';
import Title from './Components/Shared/Title';
import Product from './Components/product';
import Rating from './Components/Rating';
import { Store } from './Context/Store'
import HomePage from './Pages/HomePage';
import ProductPage from './Pages/ProductPage';
import CartPage from './Pages/CartPage';
import SigningPage from './Pages/SigningPage';
import { getError, CallingAddToCartHandler, CallingSortHandler } from './Utils';
import { Helmet } from 'react-helmet-async';
import reportWebVitals from './reportWebVitals';
import { HelmetProvider } from 'react-helmet-async';
import  StoreProvider  from './Context/Store';
import { homeReducer } from './Reducer/homeReducer';
import { productReducer } from './Reducer/productReducer';
// import { ToastContainer } from 'react-toastify';
// import { toast } from 'react-toastify';

export {
  axios,
  App,
  React,
  ReactDOM,
  useEffect,
  useReducer,
  useContext,
  useState,
  createContext,
  useParams,
  useNavigate,
  useLocation,
  Link,
  BrowserRouter,
  Routes,
  Route,
  GET_SUCCESS,
  GET_FAIL,
  GET_REQUEST,
  ADD_TO_CART,
  USER_SIGNIN,
  REMOVE_FROM_CART,
  USER_SIGNOUT,
  SAVE_PAYMENT_METHOD,
  CREATE_FAILED,
  CREATE_REQUEST,
  CREATE_SUCCEEDED,
  CLEAR_CART,
  SAVE_SHIPPING_ADDRESS,
  Row,
  Col,
  Container,
  ListGroup,
  Card,
  Button,
  Badge,
  NavBar,
  Nav,
  Spinner,
  Form,
  Alert,
  LinkContainer,
  Loading,
  MessageBox,
  Footer,
  Navbar,
  Title,
  Product,
  Rating,
  Store,
  HomePage,
  ProductPage,
  CartPage,
  SigningPage,
  getError,
  CallingAddToCartHandler,
  CallingSortHandler,
  Helmet,
  reportWebVitals,
  HelmetProvider,
  StoreProvider,
  homeReducer,
  productReducer,
//   ToastContainer,
//   toast,
};
