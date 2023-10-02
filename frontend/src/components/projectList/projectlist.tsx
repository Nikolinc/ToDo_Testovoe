import { useEffect } from "react";
import "./projectList.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { ProjectSelector, fecthProject } from "store/project/reducer";
import { Project } from "types/project";
import Carousel from "components/carousel/carousel";
import { title } from "process";
import ProgressBar from "components/progressBar/progressbar";
;

function ProjectList(props: { q: string }) {
  const dispatch = useDispatch();
  const project: Project[] = useSelector(ProjectSelector.getProject);
  const loading = useSelector(ProjectSelector.getLoading);
  const error = useSelector(ProjectSelector.getError);

  console.log("project", project);

  useEffect(() => {
    dispatch(fecthProject())
  }, []);


  function Search(project: Project) {
    return project.title.toUpperCase().indexOf(props.q.toUpperCase()) != -1 || project.description.toUpperCase().indexOf(props.q.toUpperCase()) != -1
  }


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
        {project.sort((a, b) => Number(a.Update) - Number(b.Update)).filter(Search).map((project: Project) => {
          return <div className="project-item component" key={project._id}>
            <img src={`http://localhost:7700/${project.image}`} alt="" width="100%" />
            <h4>{project.title}</h4>
            <h5>
              {project.description}
            </h5>
            <div className="flex progress">
              <ProgressBar filled={35} />
            </div>
          </div>
        })}</Carousel>
    </div>
  );
}

export default ProjectList;
