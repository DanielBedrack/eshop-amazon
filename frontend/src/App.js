import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ProductPage from './Pages/ProductPage';
import CartPage from './Pages/CartPage';
import PaymentPage from './Pages/PaymentPage';
import SubmitOrderPage from './Pages/SubmitOrderPage';
import Container from 'react-bootstrap/Container';
import SigninPage from './Pages/SigninPage';
import SignupPage from './Pages/SignUpPage';
import ShippingAdressPage from './Pages/ShippingAdressPage';
import SearchPage from './Pages/SearchPage';
import Navbar from './Components/Shared/NavBar';
import Footer from './Components/Shared/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderPage from './Pages/OrderPage';
import ResetPasswordPage from './Pages/ResetPasswordPage';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column side-allpage">
        <ToastContainer position="bottom-center" limit={1} />
        <Navbar />
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:token" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/signin" element={<SigninPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forget-password" element={<ResetPasswordPage />} />
              <Route path="/shipping" element={<ShippingAdressPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/placeorder" element={<SubmitOrderPage />} />
              <Route path="/order/:id" element={<OrderPage />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
