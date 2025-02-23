// src/components/home/about.jsx
import aboutimg from '../../assets/img/about.jpg'
const About = () => {
  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 pb-4 pb-lg-0">
            <img className="img-fluid w-100" src={aboutimg} alt="" />
            <div className="bg-primary text-dark text-center p-4">
              <h3 className="m-0">25+ Years Experience</h3>
            </div>
          </div>
          <div className="col-lg-7">
            <h6 className="text-primary text-uppercase font-weight-bold">About Us</h6>
            <h1 className="mb-4">Trusted & Faster Logistic Service Provider</h1>
            <p className="mb-4">
              Dolores lorem lorem ipsum sit et ipsum. Sadip sea amet diam dolore sed et. Sit rebum labore sit sit ut vero no sit. Et elitr stet dolor sed sit et sed ipsum et kasd ut. Erat duo eos et erat sed diam duo
            </p>
            <div className="d-flex align-items-center pt-2">
              <button type="button" className="btn-play" data-toggle="modal"
                data-src="https://www.youtube.com/embed/DWRcNpR6Kdc" data-target="#videoModal">
                <span></span>
              </button>
              <h5 className="font-weight-bold m-0 ml-4">Play Video</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;