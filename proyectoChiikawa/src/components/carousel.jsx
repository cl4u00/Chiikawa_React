import React, { useState } from 'react';
import './Carousel.css';

const Carousel = () => {
  // Lista de imágenes utilizando las rutas de tu carpeta public/images
  const images = [
    '/images/cocinando.png',
    '/images/panqueques.png',
    '/images/pudding.png'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel-container">
      <button 
        className="carousel-btn prev" 
        onClick={prevSlide}
        aria-label="Imagen anterior"
      >
        &#10094;
      </button>
      
      <div className="carousel-slide">
        <img 
          src={images[currentIndex]} 
          alt={`Visualización del carrusel número ${currentIndex + 1}`} 
          className="carousel-img" 
        />
      </div>
      
      <button 
        className="carousel-btn next" 
        onClick={nextSlide}
        aria-label="Siguiente imagen"
      >
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;