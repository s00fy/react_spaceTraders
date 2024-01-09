import React, { useState, useEffect, useRef } from 'react';
import '../../style/stars.css';

const Stars = () => {
    const [stars, setStars] = useState([]);
    const starsRef = useRef(null);

  useEffect(() => {

    const canvas = starsRef.current;

    if (canvas) {
        const createStar = () => {
                
        const width = canvas.scrollWidth - 15;
        const height = canvas.scrollHeight - 15;
      
      const newStar = {
          left: Math.random() * width,
          top: Math.random() * height,
          size: 2 + Math.random() * 6,
          duration: 5 + Math.random() * 10,
       };

      setStars(prevStars => [...prevStars, newStar]);

      setTimeout(() => {
          setStars(prevStars => prevStars.filter(star => star !== newStar));
        }, 1000 * newStar.duration);
        };
        
        const initialStars = () => {
        const initial = [];
        for (let i = 0; i < 10; i++) {
            createStar();
        }
        setStars(initial);
        };

        initialStars();

        const createStarsInterval = setInterval(() => {
        for (let i = 0; i < 5; i++) {
            createStar();

        }
        }, 550);

        return () => clearInterval(createStarsInterval);
    }
  }, [starsRef]);

  return (
    <div id="stars" ref={starsRef}>
      {stars.map((star, index) => (
        <span
          key={index}
          className="star"
          style={{
            left: `${star.left}px`,
            top: `${star.top}px`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

export default Stars;
