import React from "react";
import "./project.css";
import Profile from "components/profile/profile";
import Dashboard from "components/dashboard/dashboard";
import NewProject from "components/createNewProject/newProject";
import { useSearchParams } from "react-router-dom";
import ProjectList from "components/projectList/projectlist";
import NavBar from "components/navbar/navbar";
import { IProject } from "types/project";

export default function Project() {
  const [searchParams, setSearchParams] = useSearchParams({ q: "" });
  const q = searchParams.get("q") || "";


  function Search(project: IProject) {
    // eslint-disable-next-line eqeqeq
    return project.title.toUpperCase().indexOf(q.toUpperCase()) !== -1 || project.description.toUpperCase().indexOf(q.toUpperCase()) !== -1
  }

  return (
    <div className="projects-page">
      <div className="leftArea">
        <Profile />
        <Dashboard />
        <NewProject />
      </div>
      <div className="project ">
        <NavBar />
        <ProjectList filter={Search} />
      </div>
    </div>
  );
}
