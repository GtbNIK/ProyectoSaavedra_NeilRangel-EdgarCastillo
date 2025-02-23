import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/registerStyles.css';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validaciones
        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (formData.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Registro exitoso');
                navigate('/login');
            } else {
                setError(data.error || 'Error en el registro');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error al intentar registrar');
        }
    };

    return (
        <div>
            <div className="jumbotron jumbotron-fluid mb-5">
                <div className="container text-center py-5">
                    <h1 className="text-white display-3">Registro</h1>
                </div>
            </div>
            
            <div className="register-container">
                <form onSubmit={handleSubmit} className="register-form">
                    <h2>Crear Cuenta</h2>
                    
                    {error && <div className="error-message">{error}</div>}
                    
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
                        <div className="password-requirements">
                            La contraseña debe tener al menos 6 caracteres
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                        <input 
                            type="password" 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="submit-button">
                            Registrarse
                        </button>
                    </div>

                    <div className="form-group text-center">
                        <p>¿Ya tienes una cuenta? 
                            <span onClick={() => navigate('/login')}>
                                Iniciar Sesión
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register; 