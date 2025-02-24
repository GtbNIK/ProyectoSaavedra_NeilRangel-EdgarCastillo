import React from 'react';

const PricingPlan = () => {
    return (
        <div className="container-fluid pt-5">
            <div className="container">
                <div className="text-center pb-2">
                    <h6 className="text-primary text-uppercase font-weight-bold">Pricing Plan</h6>
                    <h1 className="mb-4">Affordable Pricing Packages</h1>
                </div>
                <div className="row">
                    <div className="col-md-4 mb-5">
                        <div className="custom-bg2">
                            <div className="text-center p-4">
                                <h1 className="display-4 mb-0">
                                    <small className="align-top text-muted font-weight-medium" style={{ fontSize: '22px', lineHeight: '45px' }}>$</small>49<small className="align-bottom text-muted font-weight-medium" style={{ fontSize: '16px', lineHeight: '40px' }}>/Mo</small>
                                </h1>
                            </div>
                            <div className="bg-primary text-center p-4">
                                <h3 className="m-0">Basic</h3>
                            </div>
                            <div className="d-flex flex-column align-items-center py-4">
                                <p>HTML5 & CSS3</p>
                                <p>Bootstrap 4</p>
                                <p>Responsive Layout</p>
                                <p>Compatible With All Browsers</p>
                                <a href="#" className="btn btn-primary py-2 px-4 my-2">Order Now</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-5">
                        <div className="custom-bg2">
                            <div className="text-center p-4">
                                <h1 className="display-4 mb-0">
                                    <small className="align-top text-muted font-weight-medium" style={{ fontSize: '22px', lineHeight: '45px' }}>$</small>99<small className="align-bottom text-muted font-weight-medium" style={{ fontSize: '16px', lineHeight: '40px' }}>/Mo</small>
                                </h1>
                            </div>
                            <div className="bg-primary text-center p-4">
                                <h3 className="m-0">Premium</h3>
                            </div>
                            <div className="d-flex flex-column align-items-center py-4">
                                <p>HTML5 & CSS3</p>
                                <p>Bootstrap 4</p>
                                <p>Responsive Layout</p>
                                <p>Compatible With All Browsers</p>
                                <a href="#" className="btn btn-primary py-2 px-4 my-2">Order Now</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-5">
                        <div className="custom-bg2">
                            <div className="text-center p-4">
                                <h1 className="display-4 mb-0">
                                    <small className="align-top text-muted font-weight-medium" style={{ fontSize: '22px', lineHeight: '45px' }}>$</small>149<small className="align-bottom text-muted font-weight-medium" style={{ fontSize: '16px', lineHeight: '40px' }}>/Mo</small>
                                </h1>
                            </div>
                            <div className="bg-primary text-center p-4">
                                <h3 className="m-0">Business</h3>
                            </div>
                            <div className="d-flex flex-column align-items-center py-4">
                                <p>HTML5 & CSS3</p>
                                <p>Bootstrap 4</p>
                                <p>Responsive Layout</p>
                                <p>Compatible With All Browsers</p>
                                <a href="#" className="btn btn-primary py-2 px-4 my-2">Order Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingPlan;