import { useRef, useState } from "react";
import { ReactComponent as Trash } from "assets/trash.svg";
import "./deliteProject.css";
import ReactDOM from "react-dom";

function DeliteProject() {
  const [opened, setOpened] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (<>
    <button className="delite" onClick={() => setOpened(!opened)} ref={buttonRef}>
      <Trash />
    </button>
    
    <ModalDisclaimer opened={opened} triggerRef={buttonRef} onClose={() => setOpened(false)} />
  </>)
}

function ModalDisclaimer(props: ITooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);

  const portal = document.getElementById("portal") as HTMLElement;
  if (!props.opened) return null


  return ReactDOM.createPortal(
    <div className="overlay-style">
      <div className="modalDisclaimer container" ref={tooltipRef}>
        <p>Are you sure you want to delete the project?</p>
        <div className="buttonBar">
          <button className="delite-modal" onClick={() => { }}>DELITE</button>
          <button className="cancel" onClick={props.onClose}>CANCEL</button>
        </div>
      </div></div>, portal)
}

export default DeliteProject