import { useRef } from 'react';
import './carousel.css'

function Carousel(props: { children: any }) {
  const containerRef = useRef<HTMLDivElement>(null);


  const pref = () => {
    if (containerRef.current)
      containerRef.current.scrollLeft -= 300;
  };

  const next = () => {
    if (containerRef.current)
      containerRef.current.scrollLeft += 300;
  }

  return <div className="carousel flex" >
    <button
      onClick={() => pref()}
      className="button pref"
    >
      &#10094;
    </button>
    <div className="container-carousel containerRef" ref={containerRef}>
      {props.children}
    </div>
    <button
      onClick={() => next()}
      className="next button"
    >
      &#10095;
    </button></div>
}

export default Carousel;