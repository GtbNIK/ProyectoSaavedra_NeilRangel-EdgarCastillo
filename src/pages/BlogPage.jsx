import user1img from '../assets/img/user.jpg'
import blog1img from '../assets/img/blog-1.jpg'
import blog2img from '../assets/img/blog-2.jpg'

const BlogPage = () => {
    return (
        <div>
        <div className="jumbotron jumbotron-fluid mb-5">
        <div className="container text-center py-5">
            <h1 className="text-white display-3">Latest Blog</h1>
            <div className="d-inline-flex align-items-center text-white">
                <p className="m-0"><a className="text-white" href="home.html">Home</a></p>
                <i className="fa fa-circle px-3"></i>
                <p className="m-0">Blog</p>
            </div>
            </div>
        </div>
        <div className="container py-5">
            <div className="row">
                {/* Blog Grid Start */}
                <div className="col-lg-8">
                    <div className="row">
                        {Array(3).fill().map((_, index) => (
                            <div className="col-md-12 mb-3" key={index}>
                                <div className="position-relative">
                                    <img className="img-fluid w-100" src={blog1img} alt="" />
                                    <div className="position-absolute bg-primary d-flex flex-column align-items-center justify-content-center rounded-circle"
                                        style={{ width: '60px', height: '60px', bottom: '-30px', right: '30px' }}>
                                        <h4 className="font-weight-bold mb-n1">01</h4>
                                        <small className="text-white text-uppercase">Jan</small>
                                    </div>
                                </div>
                                <div className="bg-secondary mb-3" style={{ padding: '30px' }}>
                                    <div className="d-flex mb-3">
                                        <div className="d-flex align-items-center">
                                            <img className="rounded-circle" style={{ width: '40px', height: '40px' }} src={user1img} alt="" />
                                            <a className="text-muted ml-2" href="">John Doe</a>
                                        </div>
                                        <div className="d-flex align-items-center ml-4">
                                            <i className="far fa-bookmark text-primary"></i>
                                            <a className="text-muted ml-2" href="">Web Design</a>
                                        </div>
                                    </div>
                                    <h4 className="font-weight-bold mb-3">Kasd tempor diam sea justo dolor</h4>
                                    <p>Dolor sea ipsum ipsum et. Erat duo lorem magna vero dolor dolores. Rebum eirmod no dolor diam dolor amet ipsum. Lorem lorem sea sed diam est lorem magna</p>
                                    <a className="border-bottom border-primary text-uppercase text-decoration-none" href="">Read More <i className="fa fa-angle-right"></i></a>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <nav aria-label="Page navigation">
                                <ul className="pagination pagination-lg justify-content-center mb-0">
                                    <li className="page-item disabled">
                                        <a className="page-link" href="#" aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                            <span className="sr-only">Previous</span>
                                        </a>
                                    </li>
                                    <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item">
                                        <a className="page-link" href="#" aria-label="Next">
                                            <span aria-hidden="true">&raquo;</span>
                                            <span className="sr-only">Next</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                {/* Blog Grid End */}

                {/* Sidebar Start */}
                <div className="col-lg-4 mt-5 mt-lg-0">
                    {/* Search Form Start */}
                    <div className="mb-5">
                        <div className="bg-secondary" style={{ padding: '30px' }}>
                            <div className="input-group">
                                <input type="text" className="form-control border-0 p-4" placeholder="Keyword" />
                                <div className="input-group-append">
                                    <span className="input-group-text bg-primary border-primary text-white"><i className="fa fa-search"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Search Form End */}

                    {/* Category Start */}
                    <div className="mb-5">
                        <h3 className="mb-4">Categories</h3>
                        <div className="bg-secondary" style={{ padding: '30px' }}>
                            <ul className="list-inline m-0">
                                {['Web Design', 'Web Development', 'Online Marketing', 'Keyword Research', 'Email Marketing'].map((category, index) => (
                                    <li className="mb-1 py-2 px-3 bg-light d-flex justify-content-between align-items-center" key={index}>
                                        <a className="text-dark" href="#"><i className="fa fa-angle-right text-primary mr-2"></i>{category}</a>
                                        <span className="badge badge-secondary badge-pill">{Math.floor(Math.random() * 200)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {/* Category End */}

                    {/* Recent Post Start */}
                    <div className="mb-5">
                        <h3 className="mb-4">Recent Post</h3>
                        {Array(5).fill().map((_, index) => (
                            <div className="d-flex mb-3" key={index}>
                                <img className="img-fluid" src={blog2img} style={{ width: '80px', height: '80px', objectFit: 'cover' }} alt="" />
                                <a href="" className="d-flex align-items-center bg-secondary text-dark text-decoration-none px-3" style={{ height: '80px' }}>
                                    Lorem ipsum dolor sit amet consec adipis elit
                                </a>
                            </div>
                        ))}
                    </div>
                    {/* Recent Post End */}

                    {/* Tags Start */}
                    <div className="mb-5">
                        <h3 className="mb-4">Tag Cloud</h3>
                        <div className="d-flex flex-wrap m-n1">
                            {['Design', 'Development', 'Marketing', 'SEO', 'Writing', 'Consulting'].map((tag, index) => (
                                <a href="" className="btn btn-secondary m-1" key={index}>{tag}</a>
                            ))}
                        </div>
                    </div>
                    {/* Tags End */}

                    {/* Plain Text Start */}
                    <div>
                        <h3 className="mb-4">Plain Text</h3>
                        <div className="bg-secondary text-center" style={{ padding: '30px' }}>
                            <p>Vero sea et accusam justo dolor accusam lorem consetetur, dolores sit amet sit dolor clita kasd justo, diam accusam no sea ut tempor magna takimata, amet sit et diam dolor ipsum amet diam</p>
                            <a href="" className="btn btn-primary py-2 px-4">Read More</a>
                        </div>
                    </div>
                    {/* Plain Text End */}
                </div>
                {/* Sidebar End */}
            </div>
        </div>
    </div>
    );
};

export default BlogPage;