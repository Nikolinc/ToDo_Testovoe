import { useEffect, useRef, useState } from "react";
import { ReactComponent as Like } from "assets/favorite.svg";
import "./favorite.css"
import { ProjectSelector, uploadProject } from "store/project/reducer";
import { IProject } from "types/project";
import { useDispatch, useSelector } from "react-redux";

function Favorite() {
  const dispatch = useDispatch();
  const project: IProject[] = useSelector(ProjectSelector.getProject);
  const [favorit, setFavorite] = useState(project[0].favorit);
  const svgRef = useRef<SVGSVGElement>(null);

  console.log(project);

  const likes = async () => {
    setFavorite(!favorit);
    await dispatch(uploadProject({
      id: project[0]._id,
      params: 'favorit',
      value: !project[0].favorit
    }));

  }

  useEffect(() => {
    if (!svgRef.current) return;

    if (project[0].favorit) {
      svgRef.current.style.stroke = "var(--tertiary)";
      svgRef.current.style.fill = "var(--tertiary)";
    } else {
      svgRef.current.style.removeProperty("fill");
      svgRef.current.style.removeProperty("stroke");
    }
  }, [project]);

  return (
    <button className="favorite" onClick={() => likes()}>
      <Like ref={svgRef} />
    </button>
  );
}

export default Favorite;
