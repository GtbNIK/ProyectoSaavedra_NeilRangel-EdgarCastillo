exports.createCV = async (req, res) => {
    try {
        const cvData = req.body;
        console.log('Datos recibidos:', cvData); // Para debugging

        // Asegurarse de que la foto está incluida
        if (!cvData.photo) {
            console.log('No se recibió URL de foto');
        }

        const cv = new CV({
            ...cvData,
            photo: cvData.photo || '', // Asegurarse de que la foto se incluya
        });

        await cv.save();
        res.status(201).json({ message: 'CV creado exitosamente', cv });
    } catch (error) {
        console.error('Error al guardar CV:', error);
        res.status(500).json({ error: 'Error al guardar el CV' });
    }
}; 