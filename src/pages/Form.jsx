import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Importa los estilos de Leaflet
import 'leaflet-control-geocoder'; // Importa la biblioteca de geocodificación
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'; // Importa los estilos de geocodificación
import '../assets/css/formStyles.css'


const Form = () => {
    const [workExperience, setWorkExperience] = useState([{ startYear: '', endYear: '', title: '', description: '' }]);
    const [languages, setLanguages] = useState([{ language: '' }]);
    const [competencies, setCompetencies] = useState([{ competency: '', level: 0 }]);
    const [skills, setSkills] = useState([{ skill: '', level: 0 }]);
    const [education, setEducation] = useState([{ startYear: '', endYear: '', university: '', degree: '' }]);
    const [isProfileActive, setIsProfileActive] = useState(false);
    const [photoUrl, setPhotoUrl] = useState(''); // Estado para la URL de la foto
    
    // Referencia para el mapa
    const mapRef = React.useRef(null);

    const addWorkExperience = () => {
        setWorkExperience([...workExperience, { startYear: '', endYear: '', title: '', description: '' }]);
    };

    const addLanguage = () => {
        setLanguages([...languages, { language: '' }]);
    };

    const addCompetency = () => {
        setCompetencies([...competencies, { competency: '', level: 0 }]);
    };

    const addSkill = () => {
        setSkills([...skills, { skill: '', level: 0 }]);
        setTimeout(() => {
            const skillEntries = document.querySelectorAll('.skill-entry');
            const lastEntry = skillEntries[skillEntries.length - 1];
            if (lastEntry) {
                initializeSkillDots(lastEntry);
            }
        }, 0);
    };

    const addEducation = () => {
        setEducation([...education, { startYear: '', endYear: '', university: '', degree: '' }]);
    };

    const toggleProfile = () => {
        setIsProfileActive(!isProfileActive);
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Crear una URL local para la imagen
            const imageUrl = URL.createObjectURL(file);
            console.log('URL de la imagen creada:', imageUrl); // Para debugging
            setPhotoUrl(imageUrl);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');

        // Verificar si hay una URL de foto
        console.log('URL de la foto a enviar:', photoUrl); // Para debugging

        const formData = {
            userId,
            photo: photoUrl, // Enviamos la URL de la imagen
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            profession: document.getElementById('profession').value,
            description: document.getElementById('description').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            website: document.getElementById('website').value,
            
            // Dirección
            address: {
                country: document.getElementById('country').value,
                state: document.getElementById('state').value,
                city: document.getElementById('city').value,
            },

            // Experiencia laboral
            workExperience: Array.from(document.querySelectorAll('.experience-entry')).map(entry => ({
                startYear: entry.querySelector('input[name="workStartYear[]"]').value,
                endYear: entry.querySelector('input[name="workEndYear[]"]').value,
                title: entry.querySelector('input[name="workTitle[]"]').value,
                description: entry.querySelector('textarea[name="workDescription[]"]').value
            })),

            // Idiomas
            languages: Array.from(document.querySelectorAll('.language-entry')).map(entry => ({
                language: entry.querySelector('input[name="language[]"]').value
            })),

            // Competencias
            competencies: Array.from(document.querySelectorAll('.competency-entry')).map(entry => ({
                competency: entry.querySelector('input[name="competency[]"]').value,
                level: entry.querySelector('input[name="competencyLevel[]"]').value
            })),

            // Habilidades
            skills: Array.from(document.querySelectorAll('.skill-entry')).map(entry => ({
                skill: entry.querySelector('input[name="skill[]"]').value,
                level: parseInt(entry.querySelector('input[name="skillLevel[]"]').value) || 0
            })),

            // Educación
            education: Array.from(document.querySelectorAll('.education-entry')).map(entry => ({
                startYear: entry.querySelector('input[name="eduStartYear[]"]').value,
                endYear: entry.querySelector('input[name="eduEndYear[]"]').value,
                university: entry.querySelector('input[name="university[]"]').value,
                degree: entry.querySelector('input[name="degree[]"]').value
            }))
        };

        console.log('Datos a enviar:', formData); // Para debugging

        try {
            const response = await fetch('http://localhost:3001/api/cv', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log('Respuesta del servidor:', data); // Para debugging

            if (response.ok) {
                alert('CV guardado exitosamente con foto');
            } else {
                alert(data.error || 'Error al guardar el CV');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al guardar el CV');
        }
    };

    const handlePrint = () => {
        // Validaciones antes de imprimir
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const profession = document.getElementById('profession').value;
        const email = document.getElementById('email').value;

        // Validar campos requeridos
        if (!firstName || !lastName || !profession || !email) {
            alert('Por favor, complete todos los campos obligatorios (Nombre, Apellido, Profesión y Email)');
            return;
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, ingrese un correo electrónico válido');
            return;
        }

        // Recolectar datos solo si las validaciones pasan
        const workExperienceData = Array.from(document.querySelectorAll('.experience-entry')).map(entry => ({
            startYear: entry.querySelector('input[name="workStartYear[]"]').value,
            endYear: entry.querySelector('input[name="workEndYear[]"]').value,
            title: entry.querySelector('input[name="workTitle[]"]').value,
            description: entry.querySelector('textarea[name="workDescription[]"]').value
        }));

        const languagesData = Array.from(document.querySelectorAll('.language-entry')).map(entry => ({
            language: entry.querySelector('input[name="language[]"]').value
        }));

        const competenciesData = Array.from(document.querySelectorAll('.competency-entry')).map(entry => ({
            competency: entry.querySelector('input[name="competency[]"]').value,
            level: entry.querySelector('input[name="competencyLevel[]"]').value
        }));

        const skillsData = Array.from(document.querySelectorAll('.skill-entry')).map(entry => ({
            skill: entry.querySelector('input[name="skill[]"]').value,
            level: parseInt(entry.querySelector('input[name="skillLevel[]"]').value) || 0
        }));

        const educationData = Array.from(document.querySelectorAll('.education-entry')).map(entry => ({
            startYear: entry.querySelector('input[name="eduStartYear[]"]').value,
            endYear: entry.querySelector('input[name="eduEndYear[]"]').value,
            university: entry.querySelector('input[name="university[]"]').value,
            degree: entry.querySelector('input[name="degree[]"]').value
        }));

        // Validar que haya al menos una entrada en cada sección
        if (workExperienceData.length === 0) {
            alert('Por favor, agregue al menos una experiencia laboral');
            return;
        }

        if (languagesData.length === 0) {
            alert('Por favor, agregue al menos un idioma');
            return;
        }

        if (competenciesData.length === 0) {
            alert('Por favor, agregue al menos una competencia');
            return;
        }

        if (skillsData.length === 0) {
            alert('Por favor, agregue al menos una habilidad');
            return;
        }

        if (educationData.length === 0) {
            alert('Por favor, agregue al menos una formación académica');
            return;
        }

        // Validar que los campos de cada sección estén completos
        const hasEmptyWorkExperience = workExperienceData.some(exp => 
            !exp.startYear || !exp.endYear || !exp.title || !exp.description
        );
        if (hasEmptyWorkExperience) {
            alert('Por favor, complete todos los campos en Experiencia Laboral');
            return;
        }

        const hasEmptyLanguages = languagesData.some(lang => !lang.language);
        if (hasEmptyLanguages) {
            alert('Por favor, complete todos los campos en Idiomas');
            return;
        }

        const hasEmptyCompetencies = competenciesData.some(comp => 
            !comp.competency || comp.level === 0
        );
        if (hasEmptyCompetencies) {
            alert('Por favor, complete todos los campos en Competencias');
            return;
        }

        const hasEmptySkills = skillsData.some(skill => 
            !skill.skill || skill.level === 0
        );
        if (hasEmptySkills) {
            alert('Por favor, complete todos los campos en Habilidades');
            return;
        }

        const hasEmptyEducation = educationData.some(edu => 
            !edu.startYear || !edu.endYear || !edu.university || !edu.degree
        );
        if (hasEmptyEducation) {
            alert('Por favor, complete todos los campos en Formación Académica');
            return;
        }

        // Si todas las validaciones pasan, proceder con la impresión
        const printWindow = window.open('', '_blank');
        
        const printContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    @page {
                        margin: 0;
                    }
                    
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        color-adjust: exact !important;
                    }
                    
                    .cv-container {
                        max-width: 1200px;
                        margin: 0 auto;
                    }

                    .header {
                        background-color: #1a1a1a !important;
                        padding: 40px;
                        display: grid;
                        grid-template-columns: auto 1fr;
                        gap: 30px;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    
                    .section {
                        margin-bottom: 30px;
                        background-color: #444 !important;
                        padding: 20px;
                        border-radius: 8px;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    
                    .section-title {
                        color: #fff !important;
                        font-size: 22px;
                        margin-bottom: 20px;
                        padding-bottom: 10px;
                        border-bottom: 2px solid #ff3b30;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }

                    .main-content {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                    }
                    
                    .left-column {
                        background-color: #2b2b2b !important;
                        padding: 40px;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    
                    .right-column {
                        background-color: #363636 !important;
                        padding: 40px;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }

                    .profile-section {
                        margin-bottom: 40px;
                    }
                    
                    .profile-photo {
                        width: 200px;
                        height: 200px;
                        border-radius: 5px;
                        object-fit: cover;
                        margin-bottom: 20px;
                    }
                    
                    .name {
                        font-size: 48px;
                        margin: 0;
                        color: #fff;
                        font-weight: bold;
                    }
                    
                    .profession {
                        font-size: 24px;
                        color: #ff3b30;
                        margin: 10px 0;
                    }
                    
                    .contact-info {
                        margin-top: 20px;
                    }
                    
                    .contact-item {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        margin-bottom: 10px;
                        color: #fff;
                    }
                    
                    .experience-item {
                        position: relative;
                        padding-left: 25px;
                        margin-bottom: 25px;
                    }
                    
                    .experience-item::before {
                        content: '';
                        position: absolute;
                        left: 0;
                        top: 5px;
                        width: 12px;
                        height: 12px;
                        border: 2px solid #ff3b30;
                        background-color: transparent;
                    }
                    
                    .year {
                        color: #ff3b30;
                        font-weight: bold;
                        margin: 0;
                        font-size: 16px;
                    }
                    
                    .company {
                        font-weight: bold;
                        margin: 5px 0;
                        color: #fff;
                        font-size: 18px;
                    }
                    
                    .description {
                        color: #999;
                        font-size: 14px;
                        line-height: 1.5;
                    }
                    
                    .language-item {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        margin-bottom: 15px;
                        color: #fff;
                    }
                    
                    .language-item::before {
                        content: '✓';
                        color: #ff3b30;
                        font-weight: bold;
                    }
                    
                    .competency-item {
                        margin-bottom: 20px;
                        width: 100%;
                    }
                    
                    .competency-name {
                        color: #fff;
                        margin-bottom: 8px;
                        font-size: 14px;
                    }
                    
                    .progress-container {
                        width: 100%;
                        height: 8px;
                        background-color: #2b2b2b;
                        border-radius: 4px;
                        overflow: hidden;
                    }
                    
                    .progress-bar {
                        height: 100%;
                        background-color: #ff3b30;
                        border-radius: 4px;
                        transition: width 0.3s ease;
                    }
                    
                    .skill-item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 15px;
                    }
                    
                    .skill-name {
                        color: #fff;
                    }
                    
                    .skill-dots {
                        display: flex;
                        gap: 4px;
                    }
                    
                    .skill-dot {
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        background-color: #2b2b2b;
                        border: 1px solid #ff3b30;
                    }
                    
                    .skill-dot.active {
                        background-color: #ff3b30;
                    }
                </style>
            </head>
            <body>
                <div class="cv-container">
                    <div class="header">
                        ${photoUrl ? `<img src="${photoUrl}" class="profile-photo" alt="Foto de perfil"/>` : ''}
                        <div class="header-content">
                            <h1 class="name">${document.getElementById('firstName').value} ${document.getElementById('lastName').value}</h1>
                            <p class="profession">${document.getElementById('profession').value}</p>
                            <div class="contact-info">
                                <div class="contact-item">📞 ${document.getElementById('phone').value}</div>
                                <div class="contact-item">✉️ ${document.getElementById('email').value}</div>
                                <div class="contact-item">🌐 ${document.getElementById('website').value}</div>
                                <div class="contact-item">📍 ${document.getElementById('city').value}, ${document.getElementById('state').value}</div>
                            </div>
                        </div>
                    </div>

                    <div class="main-content">
                        <div class="left-column">
                            <div class="section">
                                <h2 class="section-title">Experiencia Laboral</h2>
                                ${workExperienceData.map(exp => `
                                    <div class="experience-item">
                                        <p class="year">${exp.startYear} - ${exp.endYear}</p>
                                        <p class="company">${exp.title}</p>
                                        <p class="description">${exp.description}</p>
                                    </div>
                                `).join('')}
                            </div>

                            <div class="section">
                                <h2 class="section-title">Formación Académica</h2>
                                ${educationData.map(edu => `
                                    <div class="experience-item">
                                        <p class="year">${edu.startYear} - ${edu.endYear}</p>
                                        <p class="company">${edu.university}</p>
                                        <p class="description">${edu.degree}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="right-column">
                            <div class="section">
                                <h2 class="section-title">Idiomas</h2>
                                ${languagesData.map(lang => `
                                    <div class="language-item">${lang.language}</div>
                                `).join('')}
                            </div>

                            <div class="section">
                                <h2 class="section-title">Competencias</h2>
                                ${competenciesData.map(comp => `
                                    <div class="competency-item">
                                        <div class="competency-name">${comp.competency}</div>
                                        <div class="progress-container">
                                            <div class="progress-bar" style="width: ${comp.level}%;"></div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>

                            <div class="section">
                                <h2 class="section-title">Habilidades</h2>
                                ${skillsData.map(skill => `
                                    <div class="skill-item">
                                        <span class="skill-name">${skill.skill}</span>
                                        <div class="skill-dots">
                                            ${Array(5).fill(0).map((_, i) => `
                                                <span class="skill-dot ${i < Math.round(skill.level/20) ? 'active' : ''}"></span>
                                            `).join('')}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `;

        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.onload = function() {
            printWindow.print();
            printWindow.onafterprint = function() {
                printWindow.close();
            };
        };
    };

    const initializeSkillDots = (container) => {
        const dots = container.querySelectorAll('.skill-dot');
        const rangeInput = container.querySelector('input[name="skillLevel[]"]');
        
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const rating = parseInt(this.dataset.rating);
                rangeInput.value = rating * 20; // Convertir a escala 0-100
                
                dots.forEach(d => {
                    const dotRating = parseInt(d.dataset.rating);
                    if (dotRating <= rating) {
                        d.classList.add('active');
                    } else {
                        d.classList.remove('active');
                    }
                });
            });
        });
    };

    useEffect(() => {
        // Verificar si el mapa ya ha sido inicializado
        if (mapRef.current) return;

        // Inicializar el mapa
        mapRef.current = L.map('map').setView([10.1619, -68.0019], 13); // Coordenadas de Carabobo, Venezuela

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(mapRef.current);

        // Añadir buscador al mapa
        const geocoder = L.Control.geocoder({
            defaultMarkGeocode: false
        }).on('markgeocode', function(e) {
            const { center, properties } = e.geocode;
            mapRef.current.setView(center, 13);
            
            // Actualizar los campos de dirección
            document.getElementById('city').value = properties.city || '';
            document.getElementById('state').value = properties.state || '';
            document.getElementById('country').value = properties.country || '';
            
            // Actualizar información de ubicación
            const locationInfo = document.getElementById('location-info');
            const city = properties.city || '-';
            const state = properties.state || '-';
            const country = properties.country || '-';
            locationInfo.textContent = `Ciudad: ${city}, Estado: ${state}, País: ${country}`;
        }).addTo(mapRef.current);

        // Funciones para agregar entradas
        window.addWorkExperience = addWorkExperience;
        window.addLanguage = addLanguage;
        window.addCompetency = addCompetency;
        window.addSkill = addSkill;
        window.addEducation = addEducation;

        // Función para eliminar entradas
        window.deleteEntry = (button) => {
            button.closest('.language-entry, .competency-entry, .education-entry, .experience-entry, .skill-entry').remove();
        };

        // Función para actualizar la barra de progreso
        window.updateProgressBar = (input) => {
            const progressBar = input.parentElement.querySelector('.progress-bar');
            progressBar.style.width = input.value + '%';
            progressBar.style.backgroundColor = 'red';
        };

        // Inicializar los puntos de habilidad existentes
        const skillEntries = document.querySelectorAll('.skill-entry');
        skillEntries.forEach(entry => initializeSkillDots(entry));

        // Manejar el envío del formulario
        document.getElementById('cvForm').addEventListener('submit', handleSubmit);

        // Limpiar el efecto al desmontar el componente
        return () => {
            if (mapRef.current) {
                mapRef.current.remove(); // Eliminar el mapa al desmontar
                mapRef.current = null; // Limpiar la referencia del mapa
            }
        };
    }, []); // El array vacío asegura que esto se ejecute solo una vez al montar el componente

    // Limpiamos la URL al desmontar el componente
    useEffect(() => {
        return () => {
            if (photoUrl) {
                URL.revokeObjectURL(photoUrl);
            }
        };
    }, [photoUrl]);

    return (
        <div>
            <div className="jumbotron jumbotron-fluid mb-5">
                <div className="container text-center py-5">
                <h1 className="text-white display-3">Admin Area</h1>
            </div>
        </div>
            <div className="container" style={{ display: 'flex', alignItems: 'flex-start' }}>
                <button 
                    className="sidebar" 
                    style={{ 
                        width: '250px', 
                        marginRight: '20px', 
                        backgroundColor: isProfileActive ? '#fd3a2d' : 'white', 
                        padding: '15px', 
                        borderRadius: '8px', 
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)', 
                        border: 'none', 
                        cursor: 'pointer' 
                    }} 
                    onClick={toggleProfile}
                >
                    <h3>Perfil</h3>
                    {/* Aquí puedes agregar más elementos al sidebar más adelante */}
                </button>
                <form id="cvForm" className="form-container" style={{ flex: 1 }}>
                    <h2>Formulario - Edgar Castillo - Neil Rangel</h2>
                    
                    <div className="form-group">
                        <label htmlFor="firstName">Nombre</label>
                        <input type="text" id="firstName" name="firstName" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Apellido</label>
                        <input type="text" id="lastName" name="lastName" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="profession">Profesión</label>
                        <input type="text" id="profession" name="profession" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="photo" className="custom-file-upload">
                            Seleccionar Foto
                        </label>
                        <input 
                            type="file" 
                            id="photo" 
                            name="photo" 
                            accept="image/*" 
                            onChange={handlePhotoChange}
                        />
                        {photoUrl && (
                            <div className="photo-preview">
                                <img 
                                    src={photoUrl} 
                                    alt="Vista previa" 
                                    style={{ 
                                        maxWidth: '200px', 
                                        marginTop: '10px',
                                        borderRadius: '8px'
                                    }} 
                                />
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Descripción</label>
                        <textarea id="description" name="description" rows="4"></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Teléfono</label>
                        <input type="tel" id="phone" name="phone" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input type="email" id="email" name="email" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="website">Página Web</label>
                        <input type="url" id="website" name="website" />
                    </div>

                    <h3>Dirección</h3>
                    <div className="address-container">
                        <div className="form-group">
                            <label htmlFor="country">País</label>
                            <input type="text" id="country" name="country" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="state">Estado</label>
                            <input type="text" id="state" name="state" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city">Ciudad</label>
                            <input type="text" id="city" name="city" />
                        </div>
                    </div>

                    <div className="form-group">
                        <div id="map" style={{ height: '400px' }}></div>
                        <div id="location-info" className="location-info">Ciudad: -, Estado: -, País: -</div>
                    </div>

                    <h3>Experiencia Laboral</h3>
                    <div id="workExperience" className="experience-container">
                        {workExperience.map((entry, index) => (
                            <div key={index} className="experience-entry">
                                <div className="year-range">
                                    <div className="form-group">
                                        <label>Desde</label>
                                        <input type="number" name="workStartYear[]" min="1950" max="2024" />
                                    </div>
                                    <div className="form-group">
                                        <label>Hasta</label>
                                        <input type="number" name="workEndYear[]" min="1950" max="2024" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Título</label>
                                    <input type="text" name="workTitle[]" />
                                </div>
                                <div className="form-group">
                                    <label>Descripción</label>
                                    <textarea name="workDescription[]" rows="3"></textarea>
                                </div>
                                <button type="button" className="delete-button" onClick={(e) => { 
                                    const entry = e.target.closest('.experience-entry');
                                    if (entry) entry.remove();
                                }}>×</button>
                            </div>
                        ))}
                    </div>
                    <button type="button" className="add-button" onClick={addWorkExperience}>+ Agregar Experiencia</button>
                    <br />
                    <br />
                    <h3>Idiomas</h3>
                    <div id="languages" className="languages-container">
                        {languages.map((entry, index) => (
                            <div key={index} className="language-entry">
                                <div className="form-group">
                                    <label>Idioma</label>
                                    <input type="text" name="language[]" />
                                </div>
                                <button type="button" className="delete-button" onClick={(e) => { 
                                    const entry = e.target.closest('.language-entry');
                                    if (entry) entry.remove();
                                }}>×</button>
                            </div>
                        ))}
                    </div>
                    <button type="button" className="add-button" onClick={addLanguage}>+ Agregar Idioma</button>
                    <br />
                    <br />
                    <h3>Competencias</h3>
                    <div id="competencies" className="competencies-container">
                        {competencies.map((entry, index) => (
                            <div key={index} className="competency-entry">
                                <div className="form-group">
                                    <label>Competencia</label>
                                    <input type="text" name="competency[]" />
                                </div>
                                <div className="form-group">
                                    <label>Nivel</label>
                                    <div className="progress-container">
                                        <div className="progress-bar"></div>
                                        <input type="range" name="competencyLevel[]" min="0" max="100" className="progress-red" onInput={(e) => { 
                                            const progressBar = e.target.parentElement.querySelector('.progress-bar');
                                            progressBar.style.width = e.target.value + '%';
                                            progressBar.style.backgroundColor = 'red';
                                        }} />
                                    </div>
                                </div>
                                <button type="button" className="delete-button" onClick={(e) => { 
                                    const entry = e.target.closest('.competency-entry');
                                    if (entry) entry.remove();
                                }}>×</button>
                            </div>
                        ))}
                    </div>
                    <button type="button" className="add-button" onClick={addCompetency}>+ Agregar Competencia</button>
                    <br />
                    <br />
                    <h3>Habilidades</h3>
                    <div id="skills" className="skills-container">
                        {skills.map((entry, index) => (
                            <div key={index} className="skill-entry">
                                <div className="form-group">
                                    <label>Habilidad</label>
                                    <input type="text" name="skill[]" />
                                </div>
                                <div className="form-group">
                                    <label>Nivel</label>
                                    <div className="skill-rating">
                                        <span className="skill-dot" data-rating="1"></span>
                                        <span className="skill-dot" data-rating="2"></span>
                                        <span className="skill-dot" data-rating="3"></span>
                                        <span className="skill-dot" data-rating="4"></span>
                                        <span className="skill-dot" data-rating="5"></span>
                                        <input type="range" name="skillLevel[]" min="0" max="100" defaultValue="0" style={{display: 'none'}} />
                                    </div>
                                </div>
                                <button type="button" className="delete-button" onClick={(e) => { 
                                    const entry = e.target.closest('.skill-entry');
                                    if (entry) entry.remove();
                                }}>×</button>
                            </div>
                        ))}
                    </div>
                    <button type="button" className="add-button" onClick={addSkill}>+ Agregar Habilidad</button>
                    <br />
                    <br />
                    <h3>Formación Académica</h3>
                    <div id="education" className="education-container">
                        {education.map((entry, index) => (
                            <div key={index} className="education-entry">
                                <div className="year-range">
                                    <div className="form-group">
                                        <label>Desde</label>
                                        <input type="number" name="eduStartYear[]" min="1950" max="2024" />
                                    </div>
                                    <div className="form-group">
                                        <label>Hasta</label>
                                        <input type="number" name="eduEndYear[]" min="1950" max="2024" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Universidad</label>
                                    <input type="text" name="university[]" />
                                </div>
                                <div className="form-group">
                                    <label>Carrera</label>
                                    <input type="text" name="degree[]" />
                                </div>
                                <button type="button" className="delete-button" onClick={(e) => { 
                                    const entry = e.target.closest('.education-entry');
                                    if (entry) entry.remove();
                                }}>×</button>
                            </div>
                        ))}
                    </div>
                    <button type="button" className="add-button" onClick={addEducation}>+ Agregar Formación</button>

                    <div className="form-group submit-group">
                        <button type="submit" className="submit-button">Guardar CV</button>
                        <button type="button" className="print-button" onClick={handlePrint}>Imprimir CV</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form;