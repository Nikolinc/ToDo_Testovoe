import { useEffect, useRef, useState } from "react";
import { ReactComponent as File } from "assets/file.svg";
import { ReactComponent as Description } from "assets/description..svg";
import ReactDOM from "react-dom";
import './addFile.css'
import useModal from "hooks/useModal";

function AddFile() {
  const [opened, setOpened] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const page = document.getElementById("tasks-page") as HTMLDivElement;

  return (<>

    <label className="file-input__label" htmlFor="file-input">  <File />
      <span> Add Files</span>
    </label>

    <input
      type="file"
      name="file-input"
      id="file-input"
      className="file-input__input"
    />

    {/* <ModalDisclaimer opened={opened} triggerRef={buttonRef} onClose={() => setOpened(false)} /> */}
  </>)
}

function ModalDisclaimer(props: ITooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);


  useModal({
    elementRef: tooltipRef,
    triggerRef: props.triggerRef,
    onOutsideClick: props.onClose,
    enabled: props.opened,
  });

  if (!props.opened) return <></>


  return (<div className="container addFile" ref={tooltipRef}>
    <div className="drag-area">
      Release the files to download them
    </div>
  </div>)
}

export default AddFile