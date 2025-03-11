// Loader.jsx
import React from 'react';
import '../../../src/assets/css/style.css'; // Asegúrate de importar el archivo CSS

const Loader = () => {
    return (
        <div className="loader">
            <div className="tangram">
                <div className="tangram-piece"></div>
                <div className="tangram-piece"></div>
                <div className="tangram-piece"></div>
                <div className="tangram-piece"></div>
            </div>
        </div>
    );
};

export default Loader;