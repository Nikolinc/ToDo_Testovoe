import React, { useState } from "react"
import "./newProject.css"

export default function NewProject() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("")

  const onSave = () => {

  }

  const onClose = () => {
    setTitle("");
    setDescription("");
  }

  return <div className="component newProject">
    <h2>
      Add New Project
    </h2>
    <input type="title" id="title" placeholder="Title..." value={title} 
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setTitle(e.target.value) }} />
    <textarea id="description" placeholder="Description..." value={description} 
    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setDescription(e.target.value) }} />
    <div className="ButtonBar">
      <button className="save" onClick={() => onSave()}>SAVE</button>
      <button className="cancel" onClick={() => onClose()}>CANCEL</button>
    </div>
  </div>
} 