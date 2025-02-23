// src/pages/Home.jsx
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

const Home = () => {
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