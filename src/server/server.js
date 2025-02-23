import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bcrypt from 'bcrypt';

const app = express();

app.use(cors());
app.use(express.json());

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',     // Este es el usuario por defecto
    password: '12345678', // Cambia esto por tu contraseña de MySQL
    database: 'cv_manager'
});

// Verificar la conexión a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos MySQL');
});

// Ruta para el registro de usuarios
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    try {
        // Verificar si el usuario ya existe
        connection.query(
            'SELECT * FROM users WHERE email = ?',
            [email],
            async (error, results) => {
                if (error) {
                    console.error('Error al buscar usuario:', error);
                    return res.status(500).json({ error: 'Error en el servidor' });
                }

                if (results.length > 0) {
                    return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
                }

                try {
                    // Hashear la contraseña
                    const hashedPassword = await bcrypt.hash(password, 10);

                    // Insertar nuevo usuario
                    connection.query(
                        'INSERT INTO users (email, password) VALUES (?, ?)',
                        [email, hashedPassword],
                        (error, results) => {
                            if (error) {
                                console.error('Error al insertar usuario:', error);
                                return res.status(500).json({ error: 'Error al registrar usuario' });
                            }
                            
                            console.log('Usuario registrado exitosamente:', results);
                            res.json({ 
                                message: 'Usuario registrado exitosamente',
                                userId: results.insertId 
                            });
                        }
                    );
                } catch (hashError) {
                    console.error('Error al hashear la contraseña:', hashError);
                    return res.status(500).json({ error: 'Error al procesar la contraseña' });
                }
            }
        );
    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta para el login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    try {
        connection.query(
            'SELECT * FROM users WHERE email = ?',
            [email],
            async (error, results) => {
                if (error) {
                    console.error('Error en login:', error);
                    return res.status(500).json({ error: 'Error en el servidor' });
                }

                if (results.length === 0) {
                    return res.status(401).json({ error: 'Usuario no encontrado' });
                }

                const user = results[0];
                
                try {
                    const validPassword = await bcrypt.compare(password, user.password);

                    if (!validPassword) {
                        return res.status(401).json({ error: 'Contraseña incorrecta' });
                    }

                    res.json({ 
                        message: 'Login exitoso',
                        userId: user.id
                    });
                } catch (bcryptError) {
                    console.error('Error al comparar contraseñas:', bcryptError);
                    return res.status(500).json({ error: 'Error al verificar la contraseña' });
                }
            }
        );
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta para guardar el formulario CV
app.post('/api/cv', (req, res) => {
    const {
        userId,
        photo,
        firstName,
        lastName,
        profession,
        phone,
        email,
        website,
        description,
        address,
        workExperience,
        languages,
        competencies,
        skills,
        education
    } = req.body;

    // Primero insertamos el perfil básico
    connection.query(
        `INSERT INTO profiles (
            user_id, 
            photo,
            first_name, 
            last_name, 
            profession,
            phone,
            email,
            website,
            description,
            country,
            state,
            city
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            userId,
            photo,
            firstName, 
            lastName, 
            profession,
            phone,
            email,
            website,
            description,
            address.country,
            address.state,
            address.city
        ],
        (error, results) => {
            if (error) {
                console.error('Error al guardar el perfil:', error);
                return res.status(500).json({ error: 'Error al guardar el CV' });
            }

            const profileId = results.insertId;

            // Insertar experiencia laboral
            if (workExperience && workExperience.length > 0) {
                const workQuery = 'INSERT INTO work_experience (profile_id, start_year, end_year, title, description) VALUES ?';
                const workValues = workExperience.map(exp => [
                    profileId,
                    exp.startYear,
                    exp.endYear,
                    exp.title,
                    exp.description
                ]);

                connection.query(workQuery, [workValues], (error) => {
                    if (error) console.error('Error al guardar experiencia laboral:', error);
                });
            }

            // Insertar idiomas
            if (languages && languages.length > 0) {
                const languageQuery = 'INSERT INTO languages (profile_id, language) VALUES ?';
                const languageValues = languages.map(lang => [
                    profileId,
                    lang.language
                ]);

                connection.query(languageQuery, [languageValues], (error) => {
                    if (error) console.error('Error al guardar idiomas:', error);
                });
            }

            // Insertar competencias
            if (competencies && competencies.length > 0) {
                const competencyQuery = 'INSERT INTO competencies (profile_id, competency, level) VALUES ?';
                const competencyValues = competencies.map(comp => [
                    profileId,
                    comp.competency,
                    comp.level
                ]);

                connection.query(competencyQuery, [competencyValues], (error) => {
                    if (error) console.error('Error al guardar competencias:', error);
                });
            }

            // Insertar habilidades
            if (skills && skills.length > 0) {
                const skillQuery = 'INSERT INTO skills (profile_id, skill, level) VALUES ?';
                const skillValues = skills.map(skill => [
                    profileId,
                    skill.skill,
                    skill.level
                ]);

                connection.query(skillQuery, [skillValues], (error) => {
                    if (error) console.error('Error al guardar habilidades:', error);
                });
            }

            // Insertar educación
            if (education && education.length > 0) {
                const educationQuery = 'INSERT INTO education (profile_id, start_year, end_year, university, degree) VALUES ?';
                const educationValues = education.map(edu => [
                    profileId,
                    edu.startYear,
                    edu.endYear,
                    edu.university,
                    edu.degree
                ]);

                connection.query(educationQuery, [educationValues], (error) => {
                    if (error) console.error('Error al guardar educación:', error);
                });
            }

            res.json({ 
                success: true, 
                message: 'CV guardado exitosamente',
                profileId: profileId 
            });
        }
    );
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
}); 