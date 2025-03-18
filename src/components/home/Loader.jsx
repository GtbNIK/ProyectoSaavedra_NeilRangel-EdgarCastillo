import React, { useState, useEffect } from 'react';
import '../../assets/css/Loader.css'; // Archivo CSS para estilos del Loader

const Loader = () => {
    return (
    <div className="loader-container">
        <div className="tangram">
            <div className="triangle-1"></div>
            <div className="triangle-2"></div>
            <div className="triangle-3"></div>
            <div className="triangle-4"></div>
            <div className="triangle-5"></div>
            <div className="square"></div>
            <div className="parallelogram"></div>
        </div>
    </div>
    );
};

export default Loader;