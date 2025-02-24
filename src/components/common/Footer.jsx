import React from 'react';

const Footer = ({ secondaryColor }) => {
    return (
        <>
            <div className="container-fluid footer" style={{ backgroundColor: secondaryColor || '#1F3142', color: 'white', marginTop: '5rem', padding: '5rem 0' }}>
                <div className="row pt-5">
                    <div className="col-lg-7 col-md-6">
                        <div className="row">
                            <div className="col-md-6 mb-5">
                                <h3 className="text-primary mb-4">Get In Touch</h3>
                                <p><i className="fa fa-map-marker-alt mr-2"></i>123 Street, New York, USA</p>
                                <p><i className="fa fa-phone-alt mr-2"></i>+012 345 67890</p>
                                <p><i className="fa fa-envelope mr-2"></i>info@example.com</p>
                                <div className="d-flex justify-content-start mt-4">
                                    <a className="btn btn-outline-light btn-social mr-2" href="#"><i className="fab fa-twitter"></i></a>
                                    <a className="btn btn-outline-light btn-social mr-2" href="#"><i className="fab fa-facebook-f"></i></a>
                                    <a className="btn btn-outline-light btn-social mr-2" href="#"><i className="fab fa-linkedin-in"></i></a>
                                    <a className="btn btn-outline-light btn-social" href="#"><i className="fab fa-instagram"></i></a>
                                </div>
                            </div>
                            <div className="col-md-6 mb-5">
                                <h3 className="text-primary mb-4">Quick Links</h3>
                                <div className="d-flex flex-column justify-content-start">
                                    <a className="text-white mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Home</a>
                                    <a className="text-white mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>About Us</a>
                                    <a className="text-white mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Our Services</a>
                                    <a className="text-white mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Pricing Plan</a>
                                    <a className="text-white" href="#"><i className="fa fa-angle-right mr-2"></i>Contact Us</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-6 mb-5">
                        <h3 className="text-primary mb-4">Newsletter</h3>
                        <p>Rebum labore lorem dolores kasd est, et ipsum amet et at kasd, ipsum sea tempor magna tempor. Accu kasd sed ea duo ipsum. Dolor duo eirmod sea justo no lorem est diam</p>
                        <div className="w-100">
                            <div className="input-group">
                                <input type="text" className="form-control border-light" style={{ padding: '30px' }} placeholder="Your Email Address" />
                                <div className="input-group-append">
                                    <button className="btn btn-primary px-4">Sign Up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="container-fluid footer" style={{ backgroundColor: secondaryColor || '#1F3142', color: 'white', borderTop: '1px solid #3E3E4E', padding: '20px 0' }}>
                <div className="row">
                    <div className="col-lg-6 text-center text-md-left mb-3 mb-md-0">
                        <p className="m-0 text-white">&copy; <a href="">Import Services C.A. </a>. All Rights Reserved.</p>
                        <div>
                            <p>Designed by Neil Rangel - Edgar Castillo</p>
                        </div>
                    </div>
                    <div className="col-lg-6 text-center text-md-right">
                        <ul className="nav d-inline-flex">
                            <li className="nav-item">
                                <a className="nav-link text-white py-0" href="#">Privacy</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white py-0" href="#">Terms</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white py-0" href="#">FAQs</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white py-0" href="#">Help</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default Footer;