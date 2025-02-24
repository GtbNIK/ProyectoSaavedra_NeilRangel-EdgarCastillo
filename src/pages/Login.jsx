import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/loginStyles.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userId', data.userId);
                navigate('/admin');
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al intentar iniciar sesión');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <div className="jumbotron jumbotron-fluid mb-5">
                <div className="container text-center py-5">
                    <h1 className="text-white display-3">Login</h1>
                </div>
            </div>
            
            <div className="login-container">
                <form onSubmit={handleSubmit} className="login-form">
                    <h2>Iniciar Sesión</h2>
                    
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={formData.email}
                            onChange={handleChange}
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={formData.password}
                            onChange={handleChange}
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="submit-button">
                            Iniciar Sesión
                        </button>
                    </div>

                    <div className="form-group text-center">
                        <p>¿No tienes una cuenta? 
                            <span 
                                onClick={() => navigate('/register')} 
                                style={{color: '#fd3a2d', cursor: 'pointer', marginLeft: '5px'}}
                            >
                                Regístrate
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login; 