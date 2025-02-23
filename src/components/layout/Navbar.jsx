// src/components/layout/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation(); // Obtiene la ubicación actual

    return (
        <div className="container-fluid p-0">
            <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-lg-5">
                <a href="index.html" className="navbar-brand ml-lg-3">
                    <h1 className="m-0 display-5 text-uppercase text-primary"><i className="fa fa-truck mr-2"></i>Faster</h1>
                </a>
                <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between px-lg-3" id="navbarCollapse">
                    <div className="navbar-nav m-auto py-0">
                        <Link to="/" className={`nav-item nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
                        <Link to="/about.html" className={`nav-item nav-link ${location.pathname === '/about.html' ? 'active' : ''}`}>About</Link>
                        <Link to="/service.html" className={`nav-item nav-link ${location.pathname === '/service.html' ? 'active' : ''}`}>Service</Link>
                        <Link to="/prices.html" className={`nav-item nav-link ${location.pathname === '/prices.html' ? 'active' : ''}`}>Prices</Link>
                        <Link to="/blog.html" className={`nav-item nav-link ${location.pathname === '/blog.html' ? 'active' : ''}`}>Blog</Link>
                        <Link to="/contact.html" className={`nav-item nav-link ${location.pathname === '/contact.html' ? 'active' : ''}`}>Contact</Link>
                    </div>
                    <Link to="/login" className="btn btn-primary py-2 px-4 d-none d-lg-block">Login</Link>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;