import { useSearchParams } from "react-router-dom";
import "./tasks.css";
import ProjectLeftBar from "components/projectLeftBar/projectLeftBar";
import TaskList from "components/tasksList/taskList";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import NavBar from "components/navbar/navbar";

export default function Tasks() {

  return (
    <div className="tasks-page" id="tasks-page" >
      <ProjectLeftBar />
      <div className="tasks">
        <NavBar />
        <DndProvider backend={HTML5Backend}>
          <TaskList />
        </DndProvider>
      </div>
    </div>
  );
}
