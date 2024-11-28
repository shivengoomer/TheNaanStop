
import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

const LottieBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: containerRef.current, // the DOM element to render the animation
      renderer: 'svg', // render type
      loop: true, // loop the animation
      autoplay: true, // start playing the animation immediately
      path: 'path/to/your/animation.json', // the path to the animation JSON file
    });

    // Cleanup function to stop the animation on component unmount
    return () => animation.destroy();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1, // Place behind other components
      }}
    />
  );
};

export default LottieBackground;
