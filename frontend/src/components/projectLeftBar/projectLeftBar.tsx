import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FindId, ProjectSelector } from "store/project/reducer";
import { IProject } from "types/project";
import Favorite from "./favorite/favorite";
import { ReactComponent as Calendar } from "assets/calendar.svg";
import { ReactComponent as UserGroup } from "assets/user_group.svg";
import "./projectLeftBar.css";
import DeleteProject from "./delete/deleteProject";
import AddFile from "./addFile/addFile";
import { File } from "buffer";
import { uploadFile } from "store/project/saga";

function ProjectLeftBar() {
  const params = useParams();
  const dispatch = useDispatch();
  const project: IProject[] = useSelector(ProjectSelector.getProject);
  const [image, setImage] = useState(false);
  const [file, setfile] = useState("");
  const CreateDate = new Date(project[0].CreateDate).toUTCString();

  useEffect(() => {
    const payload = { id: params.id || "" };
    dispatch(FindId(payload));
  }, []);

  const setImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target);
    if (e.target.files) {
      var formData = new FormData();
      formData.append("id", project[0]._id);
      formData.append("params", "image");
      formData.append("file", e.target.files[0]);

      const img = uploadFile(formData).then((value) => setfile(value));
      setImage(false);
    }
  };

  const changeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {};

  return (
    <div>
      <div className="project-left-bar">
        <label>
          {image ? (
            <div className="imageError flex-center">
              {project[0].title.replace(/\s/g, "").toUpperCase()[0]}
            </div>
          ) : (
            <img
              src={`http://localhost:7700/${
                project[0].image ? project[0].image : file
              }`}
              alt=""
              onError={() => setImage(true)}
            />
          )}
          <input
            type="file"
            hidden
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImg(e)}
          />
        </label>

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
        <DeleteProject />
      </div>
    </div>
  );
}

export default ProjectLeftBar;
