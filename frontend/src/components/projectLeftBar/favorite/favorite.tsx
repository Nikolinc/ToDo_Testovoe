import { useEffect, useRef, useState } from "react";
import { ReactComponent as Like } from "assets/favorite.svg";
import "./favorite.css"

function Favorite() {

  const [favorite, setFavorite] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);


  useEffect(() => {
    if (!svgRef.current) return;
    
    if (favorite) {
      svgRef.current.style.stroke = "var(--tertiary)";
      svgRef.current.style.fill = "var(--tertiary)";
    } else {
      svgRef.current.style.removeProperty("fill");
      svgRef.current.style.removeProperty("stroke");
    }
  }, [favorite]);

  return (
    <button className="favorite" onClick={() => setFavorite(!favorite)}>
      <Like ref={svgRef} />
    </button>
  );
}

export default Favorite;
