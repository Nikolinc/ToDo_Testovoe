import React, {useState } from "react";
import "./newProject.css";
import { IProject } from "types/project";
import { useNavigate } from "react-router-dom";
import { addproject } from "store/project/saga";

export default function NewProject() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSave = async () => {
    const newProject: IProject = await addproject({
      title: title,
      description: description,
    });
    navigate(`/tasks/${newProject._id}`);
  };

  const onClose = () => {
    setTitle("");
    setDescription("");
  };

  return (
    <div className="component newProject">
      <h2>Add New Project</h2>
      <input
        type="title"
        id="title"
        placeholder="Title..."
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setTitle(e.target.value);
        }}
      />
      <textarea
        placeholder="Description..."
        value={description}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setDescription(e.target.value);
        }}
      />
      <div className="ButtonBar">
        <button className="save" onClick={() => onSave()}>
          SAVE
        </button>
        <button className="cancel" onClick={() => onClose()}>
          CANCEL
        </button>
      </div>
    </div>
  );
}
