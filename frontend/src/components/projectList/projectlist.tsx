import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProjectSelector, fecthProject } from "store/project/reducer";

function ProjectList(props: { q: string }) {
  const project = useSelector(ProjectSelector.getProject);
  const dispatch = useDispatch();

  console.log("project", project);
  useEffect(() => {
    dispatch(fecthProject());
  }, [dispatch]);
  return (
    <div className="projectList">
      {/* {project?.map((project) => {
        return <>{project.title}</>;
      })} */}
    </div>
  );
}

export default ProjectList;
