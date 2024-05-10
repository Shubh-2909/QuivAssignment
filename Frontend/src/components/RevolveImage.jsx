import React, { useEffect } from 'react';

const Image= () => {
  useEffect(() => {
    const container = document.getElementById('imageContainer');

    const handleMouseMove = (e) => {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 10;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 10;

      container.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    };

    const handleMouseLeave = () => {
      container.style.transform = 'rotateY(0deg) rotateX(0deg)';
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="h-screen flex justify-center items-center">
      <div
        id="imageContainer"
        className="relative w-80 h-80 overflow-hidden border border-gray-400"
      >
        <img
          src="./assets/authlayoutimg.jpg"
          alt="Interactive Image"
          className="w-full h-full object-cover transition-transform duration-200 ease-out"
        />
      </div>
    </div>
  );
};

export default Image;
