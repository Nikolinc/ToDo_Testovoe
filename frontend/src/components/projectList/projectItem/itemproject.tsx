import ProgressBar from "components/progressBar/progressbar";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IProject } from "types/project";
import './itemproject.css';

function ItemProject(props: { project: IProject }) {
  const [image, setImage] = useState(false);
  return <Link
    className="project-item component"
    key={props.project._id}
    to={`/tasks/${props.project._id}`}
  >
    {image ? (
      <div className="imageError flex-center">
        {props.project.title.replace(/\s/g, "").toUpperCase()[0]}
      </div>
    ) : (
      <img
        src={`http://localhost:7700/${props.project.image}`}
        alt=""
        width="100%"
        onError={() => setImage(true)}
      />
    )}
    <h4>{props.project.title}</h4>
    <h5>{props.project.description}</h5>
    <div className="flex progress">
      <ProgressBar filled={35} />
    </div>
  </Link>
}

export default ItemProject