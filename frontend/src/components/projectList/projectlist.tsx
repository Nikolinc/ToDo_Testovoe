import { useEffect } from "react";
import "./projectList.css";
import { useDispatch, useSelector } from "react-redux";
import { ProjectSelector, fecthProject } from "store/project/reducer";
import { IProject } from "types/project";
import Carousel from "components/carousel/carousel";
import ProgressBar from "components/progressBar/progressbar";
import { Link } from "react-router-dom";
;

function ProjectList(props: { filter: (project: IProject) => boolean }) {
  const dispatch = useDispatch();
  const project: IProject[] = useSelector(ProjectSelector.getProject);
  const loading = useSelector(ProjectSelector.getLoading);
  const error = useSelector(ProjectSelector.getError);

  useEffect(() => {
    dispatch(fecthProject())
  }, []);


  if (loading) {
    return <div className="loader">
      Loading ...
    </div>
  }

  if (error) {
    return <div className="loader">
      {error}
    </div>
  }

  return (
    <div className="projectList">
      <h3> Active Project</h3>
      <Carousel>
        {project.sort((a, b) => Number(a.Update) - Number(b.Update)).filter(props.filter).map((project: IProject) => {
          return <Link className="project-item component" key={project._id} to={`/tasks/${project._id}`}>
            <img src={`http://localhost:7700/${project.image}`} alt="" width="100%" />
            <h4>{project.title}</h4>
            <h5>
              {project.description}
            </h5>
            <div className="flex progress">
              <ProgressBar filled={35} />
            </div>
          </Link>
        })}</Carousel>
    </div>
  );
}

export default ProjectList;
