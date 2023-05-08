import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ProductPage from './Pages/ProductPage';

function App() {
  return (
    <BrowserRouter>
      <header>
        <Link to="/">EShop</Link>
      </header>
      <Routes>
        <Route path="/product/:token" element={<ProductPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
