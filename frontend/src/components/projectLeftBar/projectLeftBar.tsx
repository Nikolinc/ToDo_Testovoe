import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FindId, ProjectSelector } from "store/project/reducer";
import { IProject } from "types/project";
import Favorite from "./favorite/favorite";
import { ReactComponent as Calendar } from "assets/calendar.svg";
import { ReactComponent as UserGroup } from "assets/user_group.svg";
import "./projectLeftBar.css";
import DeliteProject from "./delite/deliteProject";
import AddFile from "./addFile/addFile";

function ProjectLeftBar() {
  const params = useParams();
  const dispatch = useDispatch();
  const project: IProject[] = useSelector(ProjectSelector.getProject);
  const [image, setImage] = useState(false);
  const CreateDate = new Date(project[0].CreateDate).toUTCString();

  useEffect(() => {
    const payload = { id: params.id || "" };
    dispatch(FindId(payload));
  }, []);

  const changeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => { };

  return (
    <div>
      <div className="project-left-bar">
        {image ? <div className="imageError flex-center">
          {project[0].title.replace(/\s/g, '')[0]}
        </div> :
          <img src={`http://localhost:7700/${project[0].image}`} alt="" onError={() => setImage(true)} />}

        <div className="project-info">
          <h2>
            {project[0].title} <Favorite />
          </h2>
          <textarea
            id="description"
            placeholder="Description..."
            value={project[0].description}
            onChange={(e) => {
              changeDescription(e);
            }}
          />

          <AddFile />
          <button>
            <Calendar />
            Add Due Date
          </button>
          <button>
            <UserGroup />
            Add User
          </button>
        </div>
      </div>
      <div className="footer-project-left-bar">
        <h4>Create {CreateDate}</h4>
        <DeliteProject />
      </div>
    </div>
  );
}


export default ProjectLeftBar;
