import React, { useEffect } from 'react';

const RevolveImage = () => {
  const constrain = 100;

  useEffect(() => {
    const mouseOverContainer = document.getElementById("ex1");
    const ex1Layer = document.getElementById("ex1-layer");

    const transforms = (x, y, el) => {
      const box = el.getBoundingClientRect();
      const calcX = -(y - box.y - (box.height / 2)) / constrain;
      const calcY = (x - box.x - (box.width / 2)) / constrain;
      
      return "perspective(100px) "
        + "   rotateX("+ calcX +"deg) "
        + "   rotateY("+ calcY +"deg) "
        + "   translateZ(0)"; 
    };

    const transformElement = (el, xyEl) => {
      el.style.transform = transforms(...xyEl);
    };

    const handleMouseMove = (e) => {
      const xy = [e.clientX, e.clientY];
      const position = xy.concat([ex1Layer]);

      window.requestAnimationFrame(() => {
        transformElement(ex1Layer, position);
      });
    };

    mouseOverContainer.addEventListener('mousemove', handleMouseMove);

    return () => {
      mouseOverContainer.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); 

  return (
    <div 
      id="ex1" 
      style={{
        width: '50vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(0,0,0)',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box'
      }}
    >
      <img 
        src="./assets/authlayoutimg.jpg" 
        id="ex1-layer" 
        style={{
          width: '300px',
          height: '500px',
          borderRadius: '30px',
          position: 'absolute',
        }} 
        alt="" 
      />
    </div>
  );
};

export default RevolveImage;
