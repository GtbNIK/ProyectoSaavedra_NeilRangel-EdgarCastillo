import React from 'react';
import featureimg from '../../assets/img/feature.jpg'

const Features = () => {
    return (
        <div className="container-fluid bg-secondary my-5">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-5">
                        <img className="img-fluid w-100" src={featureimg} alt="Features" />
                    </div>
                    <div className="col-lg-7 py-5 py-lg-0">
                        <h6 className="text-primary text-uppercase font-weight-bold">Why Choose Us</h6>
                        <h1 className="mb-4">Faster, Safe and Trusted Logistics Services</h1>
                        <p className="mb-4">Dolores lorem lorem ipsum sit et ipsum. Sadip sea amet diam dolore sed et. Sit rebum labore sit sit ut vero no sit. Et elitr stet dolor sed sit et sed ipsum et kasd ut. Erat duo eos et erat sed diam duo</p>
                        <ul className="list-inline">
                            <li><h6><i className="far fa-dot-circle text-primary mr-3"></i>Best In Industry</h6></li>
                            <li><h6><i className="far fa-dot-circle text-primary mr-3"></i>Emergency Services</h6></li>
                            <li><h6><i className="far fa-dot-circle text-primary mr-3"></i>24/7 Customer Support</h6></li>
                        </ul>
                        <a href="#" className="btn btn-primary mt-3 py-2 px-4">Learn More</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;