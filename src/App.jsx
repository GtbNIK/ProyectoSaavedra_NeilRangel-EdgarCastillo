// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TopBar from './components/layout/topbar';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import PricesPage from './pages/PricesPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import Footer from './components/common/footer';
import Form from './pages/Form';
import BackToTop from './components/common/backtoTop';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/Register';


function App() {
  return (
    <Router>
      <div className="wrapper">
        <TopBar />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home.html" element={<Home />} />
          <Route path="/About.html" element={<AboutPage />} />
          <Route path="/service.html" element={<ServicesPage />} />
          <Route path="/blog.html" element={<BlogPage />} />
          <Route path="/prices.html" element={<PricesPage />} />
          <Route path="/contact.html" element={<ContactPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/form" 
            element={
              <ProtectedRoute>
                <Form />
              </ProtectedRoute>
            } 
          />
        </Routes>
        <Footer />
        <BackToTop />
      </div>
    </Router>
  );
}

export default App;