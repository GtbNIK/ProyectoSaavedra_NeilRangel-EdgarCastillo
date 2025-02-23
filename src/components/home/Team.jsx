import React from 'react';
import team1img from "../../assets/img/team-1.jpg";
import team2img from "../../assets/img/team-2.jpg";
import team3img from "../../assets/img/team-3.jpg";
import team4img from "../../assets/img/team-4.jpg";

const Team = () => {
    return (
    <div className="container-fluid pt-5">
        <div className="container">
            <div className="text-center pb-2">
                <h6 className="text-primary text-uppercase font-weight-bold">Delivery Team</h6>
                <h1 className="mb-4">Meet Our Delivery Team</h1>
            </div>
            <div className="row">
                <div className="col-lg-3 col-md-6">
                    <div className="team card position-relative overflow-hidden border-0 mb-5">
                        <img className="card-img-top" src={team1img} alt="Team Member 1" />
                        <div className="card-body text-center p-0">
                            <div className="team-text d-flex flex-column justify-content-center bg-secondary">
                                <h5 className="font-weight-bold">Full Name</h5>
                                <span>Designation</span>
                            </div>
                            <div className="team-social d-flex align-items-center justify-content-center bg-primary">
                                <a className="btn btn-outline-dark btn-social mr-2" href="#"><i className="fab fa-twitter"></i></a>
                                <a className="btn btn-outline-dark btn-social mr-2" href="#"><i className="fab fa-facebook-f"></i></a>
                                <a className="btn btn-outline-dark btn-social mr-2" href="#"><i className="fab fa-linkedin-in"></i></a>
                                <a className="btn btn-outline-dark btn-social" href="#"><i className="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="team card position-relative overflow-hidden border-0 mb-5">
                        <img className="card-img-top" src={team2img} alt="Team Member 2" />
                        <div className="card-body text-center p-0">
                            <div className="team-text d-flex flex-column justify-content-center bg-secondary">
                                <h5 className="font-weight-bold">Full Name</h5>
                                <span>Designation</span>
                            </div>
                            <div className="team-social d-flex align-items-center justify-content-center bg-primary">
                                <a className="btn btn-outline-dark btn-social mr-2" href="#"><i className="fab fa-twitter"></i></a>
                                <a className="btn btn-outline-dark btn-social mr-2" href="#"><i className="fab fa-facebook-f"></i></a>
                                <a className="btn btn-outline-dark btn-social mr-2" href="#"><i className="fab fa-linkedin-in"></i></a>
                                <a className="btn btn-outline-dark btn-social" href="#"><i className="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="team card position-relative overflow-hidden border-0 mb-5">
                        <img className="card-img-top" src={team3img} alt="Team Member 3" />
                        <div className="card-body text-center p-0">
                            <div className="team-text d-flex flex-column justify-content-center bg-secondary">
                                <h5 className="font-weight-bold">Full Name</h5>
                                <span>Designation</span>
                            </div>
                            <div className="team-social d-flex align-items-center justify-content-center bg-primary">
                                <a className="btn btn-outline-dark btn-social mr-2" href="#"><i className="fab fa-twitter"></i></a>
                                <a className="btn btn-outline-dark btn-social mr-2" href="#"><i className="fab fa-facebook-f"></i></a>
                                <a className="btn btn-outline-dark btn-social mr-2" href="#"><i className="fab fa-linkedin-in"></i></a>
                                <a className="btn btn-outline-dark btn-social" href="#"><i className="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="team card position-relative overflow-hidden border-0 mb-5">
                        <img className="card-img-top" src={team4img} alt="Team Member 4" />
                        <div className="card-body text-center p-0">
                            <div className="team-text d-flex flex-column justify-content-center bg-secondary">
                                <h5 className="font-weight-bold">Full Name</h5>
                                <span>Designation</span>
                            </div>
                            <div className="team-social d-flex align-items-center justify-content-center bg-primary">
                                <a className="btn btn-outline-dark btn-social mr-2" href="#"><i className="fab fa-twitter"></i></a>
                                <a className="btn btn-outline-dark btn-social mr-2" href="#"><i className="fab fa-facebook-f"></i></a>
                                <a className="btn btn-outline-dark btn-social mr-2" href="#"><i className="fab fa-linkedin-in"></i></a>
                                <a className="btn btn-outline-dark btn-social" href="#"><i className="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Team;