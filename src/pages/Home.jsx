// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/home/header';
import About from '../components/home/About';
import Services from '../components/home/Services';
import VideoModal from '../components/common/Videomodal';
import QuoteRequest from '../components/home/QuoteRequest';
import Features from '../components/home/Features';
import PricingPlan from '../components/home/PricingPlan';
import Team from '../components/home/Team';
import Testimonial from '../components/home/Testimonial';
import Blog from '../components/home/Blog';
import BackToTop from '../components/common/backtoTop';
import Loader from '../components/home/Loader'; // Importa el componente Loader

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      // Simular una carga de datos
      const timer = setTimeout(() => {
          setLoading(false);
      }, 20000); // Duración de 20 segundos

      return () => clearTimeout(timer);
  }, []);

  if (loading) {
      return <Loader />;
  }
  return (
    <>
      <Header />
      <About />
      <VideoModal />
      <QuoteRequest />
      <Services />
      <Features />
      <PricingPlan />
      <Team />
      <Testimonial />
      <Blog />
    </>
  );
};

export default Home;