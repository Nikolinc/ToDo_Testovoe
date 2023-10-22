import { useEffect } from "react";
import "./projectList.css";
import { useDispatch, useSelector } from "react-redux";
import { ProjectSelector, fecthProject } from "store/project/reducer";
import { IProject } from "types/project";
import Carousel from "components/carousel/carousel";
import ItemProject from "./projectItem/itemproject";



function ProjectList(props: {
  title: string;
  filter: (project: IProject) => boolean;
}) {
  const dispatch = useDispatch();
  const project: IProject[] = useSelector(ProjectSelector.getProject);
  const loading = useSelector(ProjectSelector.getLoading);
  const error = useSelector(ProjectSelector.getError);
 

  useEffect(() => {
    dispatch(fecthProject());
  }, []);

  if (loading) {
    return <div className="loader">Loading ...</div>;
  }

  if (error) {
    return <div className="loader">{error}</div>;
  }

  return (
    <div className="projectList">
      <h3> {props.title}</h3>
      <Carousel>
        {project
          .sort((a, b) => Number(a.Update) - Number(b.Update))
          .filter(props.filter)
          .map((project: IProject) => {
            return (
              <ItemProject project={project} />
            );
          })}
      </Carousel>
    </div>
  );
}

export default ProjectList;
