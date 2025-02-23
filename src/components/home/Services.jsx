// src/components/home/Services.jsx
const Services = () => {
    return (
      <div className="container-fluid pt-5">
        <div className="container">
          <div className="text-center pb-2">
            <h6 className="text-primary text-uppercase font-weight-bold">Our Services</h6>
            <h1 className="mb-4">Best Logistic Services</h1>
          </div>
          <div className="row pb-3">
            <div className="col-lg-3 col-md-6 text-center mb-5">
              <div className="d-flex align-items-center justify-content-center bg-primary mb-4 p-4">
                <i className="fa fa-2x fa-plane text-dark pr-3"></i>
                <h6 className="text-white font-weight-medium m-0">Air Freight</h6>
              </div>
              <p>Diam amet eos at no eos sit lorem, amet rebum ipsum clita stet diam sea est diam</p>
              <a className="border-bottom text-decoration-none" href="">Read More</a>
            </div>
            <div className="col-lg-3 col-md-6 text-center mb-5">
              <div className="d-flex align-items-center justify-content-center bg-primary mb-4 p-4">
                <i className="fa fa-2x fa-ship text-dark pr-3"></i>
                <h6 className="text-white font-weight-medium m-0">Ocean Freight</h6>
              </div>
              <p>Diam amet eos at no eos sit lorem, amet rebum ipsum clita stet diam sea est diam</p>
              <a className="border-bottom text-decoration-none" href="">Read More</a>
            </div>
            <div className="col-lg-3 col-md-6 text-center mb-5">
              <div className="d-flex align-items-center justify-content-center bg-primary mb-4 p-4">
                <i className="fa fa-2x fa-truck text-dark pr-3"></i>
                <h6 className="text-white font-weight-medium m-0">Land Transport</h6>
              </div>
              <p>Diam amet eos at no eos sit lorem, amet rebum ipsum clita stet diam sea est diam</p>
              <a className="border-bottom text-decoration-none" href="">Read More</a>
            </div>
            <div className="col-lg-3 col-md-6 text-center mb-5">
              <div className="d-flex align-items-center justify-content-center bg-primary mb-4 p-4">
                <i className="fa fa-2x fa-store text-dark pr-3"></i>
                <h6 className="text-white font-weight-medium m-0">Cargo Storage</h6>
              </div>
              <p>Diam amet eos at no eos sit lorem, amet rebum ipsum clita stet diam sea est diam</p>
              <a className="border-bottom text-decoration-none" href="">Read More</a>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Services;