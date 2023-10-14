import { useRef, useState } from "react";
import { ReactComponent as Trash } from "assets/trash.svg";
import "./deleteProject.css";
import ReactDOM from "react-dom";
import { deleteProject } from "store/project/saga";
import { useNavigate, useParams } from "react-router-dom";

function DeleteProject() {
  const [opened, setOpened] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        className="delete"
        onClick={() => setOpened(!opened)}
        ref={buttonRef}
      >
        <Trash />
      </button>

      <ModalDisclaimer
        opened={opened}
        triggerRef={buttonRef}
        onClose={() => setOpened(false)}
      />
    </>
  );
}

function ModalDisclaimer(props: ITooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const navigate = useNavigate();
  const portal = document.getElementById("portal") as HTMLElement;
  if (!props.opened) return null;

  async function Delite() {
    const payload = { id: params.id || "" };
    const code = await deleteProject(payload);
    console.log("code", code);
    navigate("/project");
  }

  return ReactDOM.createPortal(
    <div className="overlay-style">
      <div className="modalDisclaimer container" ref={tooltipRef}>
        <p>Are you sure you want to delete the project?</p>
        <div className="buttonBar">
          <button className="delete-modal" onClick={() => Delite()}>
            DELETE
          </button>
          <button className="cancel" onClick={props.onClose}>
            CANCEL
          </button>
        </div>
      </div>
    </div>,
    portal
  );
}

export default DeleteProject;
