import { useRef, useState, useEffect } from 'react';
import Cropper from 'react-cropper';
import '../styles/cropper.css';

const MAX_FILE_SIZE_MB = 50;

// Variable global temporal para videos de la sesión
window.sessionGalleryVideos = window.sessionGalleryVideos || [];

const AboutPage = () => {
    // Imágenes
    const [imagePreview, setImagePreview] = useState(null);
    const [carouselImages, setCarouselImages] = useState([]);
    const fileInputRef = useRef();
    const cropperRef = useRef();

    // Videos
    const [videoName, setVideoName] = useState("");
    const [videoFile, setVideoFile] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [galleryVideos, setGalleryVideos] = useState(window.sessionGalleryVideos);
    const videoInputRef = useRef();

    // Cargar multimedia de localStorage al iniciar (solo imágenes)
    useEffect(() => {
        const imgs = JSON.parse(localStorage.getItem('carouselImages') || '[]');
        setCarouselImages(imgs);
        setGalleryVideos(window.sessionGalleryVideos);
    }, []);

    // Subir imagen
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size <= MAX_FILE_SIZE_MB * 1024 * 1024) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setImagePreview(ev.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert('El archivo debe ser menor a 50MB');
        }
    };

    // Recortar y guardar imagen
    const handleCrop = () => {
        const cropper = cropperRef.current?.cropper;
        if (cropper) {
            const cropped = cropper.getCroppedCanvas().toDataURL();
            let images = JSON.parse(localStorage.getItem('carouselImages') || '[]');
            images.push(cropped);
            localStorage.setItem('carouselImages', JSON.stringify(images));
            setCarouselImages(images);
            alert('Imagen guardada para el carrusel');
            setImagePreview(null);
            window.dispatchEvent(new Event('storage'));
        }
    };

    // Eliminar imagen
    const handleDeleteImage = (idx) => {
        const images = carouselImages.filter((_, i) => i !== idx);
        localStorage.setItem('carouselImages', JSON.stringify(images));
        setCarouselImages(images);
        window.dispatchEvent(new Event('storage'));
    };

    // Subir video (vista previa y espera confirmación)
    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size <= MAX_FILE_SIZE_MB * 1024 * 1024) {
            setVideoName(file.name);
            setVideoFile(file);
            setVideoPreview(URL.createObjectURL(file));
        } else {
            alert('El archivo debe ser menor a 50MB');
        }
    };

    // Guardar video en variable global y sincronizar
    const handleSaveVideo = () => {
        if (!videoFile) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            window.sessionGalleryVideos.push({ name: videoName, data: ev.target.result });
            setGalleryVideos([...window.sessionGalleryVideos]);
            setVideoName("");
            setVideoFile(null);
            setVideoPreview(null);
            if (videoInputRef.current) videoInputRef.current.value = "";
            window.dispatchEvent(new CustomEvent('sessionGalleryVideosUpdate'));
            alert('Video agregado a la galería (solo sesión actual)');
        };
        reader.readAsDataURL(videoFile);
    };

    // Eliminar video antes de guardar
    const handleCancelVideo = () => {
        setVideoName("");
        setVideoFile(null);
        setVideoPreview(null);
        if (videoInputRef.current) videoInputRef.current.value = "";
    };

    // Eliminar video de la galería
    const handleDeleteVideo = (idx) => {
        window.sessionGalleryVideos = window.sessionGalleryVideos.filter((_, i) => i !== idx);
        setGalleryVideos([...window.sessionGalleryVideos]);
        window.dispatchEvent(new CustomEvent('sessionGalleryVideosUpdate'));
    };

    return (
        <div className="container my-5">
            <h2 className="mb-4">Gestión de Multimedia (Imágenes y Videos)</h2>
            {/* Sección de imágenes */}
            <div className="mb-5">
                <h4>Imágenes del Carrusel</h4>
                <label className="btn btn-primary mb-3">
                    Subir Foto para Carrusel
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} ref={fileInputRef} />
                </label>
                {imagePreview && (
                    <div className="mt-3">
                        <h5>Recorta la imagen a tu gusto</h5>
                        <Cropper
                            src={imagePreview}
                            style={{ height: 300, width: '100%', maxWidth: 400 }}
                            guides={true}
                            ref={cropperRef}
                            viewMode={1}
                            dragMode="move"
                            scalable={true}
                            cropBoxResizable={true}
                            cropBoxMovable={true}
                        />
                        <button className="btn btn-success mt-2" onClick={handleCrop}>Recortar y Guardar</button>
                    </div>
                )}
                <div className="row mt-4">
                    {carouselImages.map((img, idx) => (
                        <div className="col-md-3 mb-3" key={idx}>
                            <img src={img} alt={`img${idx}`} style={{ width: '100%', border: '1px solid #ccc' }} />
                            <button className="btn btn-danger btn-sm mt-2" onClick={() => handleDeleteImage(idx)}>Eliminar</button>
                        </div>
                    ))}
                </div>
            </div>
            {/* Sección de videos */}
            <div className="mb-5">
                <h4>Videos de la Galería</h4>
                <label className="btn btn-secondary mb-3">
                    Subir Video para Galería
                    <input type="file" accept="video/*" style={{ display: 'none' }} onChange={handleVideoChange} ref={videoInputRef} />
                </label>
                {videoPreview && (
                    <div className="mt-2">
                        <video src={videoPreview} controls style={{ width: '100%', maxWidth: 400 }} />
                        <div className="mt-2">
                            <span>{videoName}</span>
                            <button className="btn btn-success btn-sm ml-2" onClick={handleSaveVideo}>Guardar Video</button>
                            <button className="btn btn-danger btn-sm ml-2" onClick={handleCancelVideo}>Eliminar</button>
                        </div>
                    </div>
                )}
                <div className="row mt-4">
                    {galleryVideos.map((vid, idx) => (
                        <div className="col-md-4 mb-3" key={idx}>
                            <video controls style={{ width: '100%' }} src={vid.data}></video>
                            <div className="d-flex justify-content-between align-items-center mt-2">
                                <span style={{ fontSize: '0.9em' }}>{vid.name}</span>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteVideo(idx)}>Eliminar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AboutPage;