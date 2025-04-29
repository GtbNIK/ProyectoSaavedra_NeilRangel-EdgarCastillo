// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import Header from '../components/home/Header';
import About from '../components/home/About';
import Services from '../components/home/Services';
import VideoModal from '../components/common/Videomodal';
import QuoteRequest from '../components/home/QuoteRequest';
import Features from '../components/home/Features';
import PricingPlan from '../components/home/PricingPlan';
import Team from '../components/home/Team';
import Testimonial from '../components/home/Testimonial';
import Blog from '../components/home/Blog';
import Loader from '../components/home/Loader'; // Importa el componente Loader

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [carouselImages, setCarouselImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [galleryVideos, setGalleryVideos] = useState(window.sessionGalleryVideos || []);

  useEffect(() => {
      // Simular una carga de datos
      const timer = setTimeout(() => {
          setLoading(false);
      }, 20000); // Duración de 20 segundos

      // Cargar imágenes del carrusel desde localStorage
      const images = JSON.parse(localStorage.getItem('carouselImages') || '[]');
      setCarouselImages(images);
      // Cargar videos de la galería desde variable global
      setGalleryVideos(window.sessionGalleryVideos || []);

      return () => clearTimeout(timer);
  }, []);

  // Escuchar cambios en la variable global de videos
  useEffect(() => {
    const handleSessionGalleryVideosUpdate = () => {
      setGalleryVideos([...window.sessionGalleryVideos]);
    };
    window.addEventListener('sessionGalleryVideosUpdate', handleSessionGalleryVideosUpdate);
    return () => window.removeEventListener('sessionGalleryVideosUpdate', handleSessionGalleryVideosUpdate);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? (carouselImages.length > 0 ? carouselImages.length - 1 : 0) : prev - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === (carouselImages.length > 0 ? carouselImages.length - 1 : 0) ? 0 : prev + 1
    );
  };

  if (loading) {
      return <Loader />;
  }
  return (
    <>
      {/* Carrusel de fotos */}
      <section className="container my-5">
        <h2 className="text-center mb-4">Carrusel de Fotos</h2>
        <div style={{ maxWidth: 400, margin: '0 auto', position: 'relative' }}>
          {carouselImages.length > 0 ? (
            <>
              <img
                src={carouselImages[activeIndex]}
                className="d-block w-100"
                alt={`Foto ${activeIndex + 1}`}
                style={{ height: 200, objectFit: 'cover', borderRadius: 10 }}
              />
              <button
                className="btn btn-light"
                style={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)' }}
                onClick={handlePrev}
              >
                &#8592;
              </button>
              <button
                className="btn btn-light"
                style={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)' }}
                onClick={handleNext}
              >
                &#8594;
              </button>
              <div className="text-center mt-2" style={{ fontSize: 14 }}>
                {activeIndex + 1} / {carouselImages.length}
              </div>
            </>
          ) : (
            <img
              src="https://via.placeholder.com/400x200?text=Sin+fotos"
              className="d-block w-100"
              alt="Sin fotos"
              style={{ height: 200, objectFit: 'cover', borderRadius: 10 }}
            />
          )}
        </div>
      </section>

      {/* Sección de videos */}
      <section className="container my-5">
        <h2 className="text-center mb-4">Videos</h2>
        <div className="row">
          {galleryVideos.length > 0 ? (
            galleryVideos.map((vid, idx) => (
              <div className="col-md-4 mb-4" key={idx}>
                <div className="embed-responsive embed-responsive-16by9">
                  <video className="embed-responsive-item" controls src={vid.data} style={{ width: '100%' }} />
                </div>
                <div className="text-center mt-2" style={{ fontSize: 14 }}>{vid.name}</div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center text-muted">No hay videos subidos.</div>
          )}
        </div>
      </section>

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