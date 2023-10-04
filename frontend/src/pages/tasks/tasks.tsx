import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FindId, ProjectSelector } from "store/project/reducer";
import { Project } from "types/project";

export default function Tasks() {
  const params = useParams();
  const dispatch = useDispatch();
  const project: Project[] = useSelector(ProjectSelector.getProject);

  console.log("project", project);

  useEffect(() => {
    const payload = { id: params.id || "" }
    dispatch(FindId(payload))
  }, [params]);


  return <>Tasks</>
}