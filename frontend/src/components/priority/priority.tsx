import { useRef, useState } from "react";
import './priority.css';
import useModal from "hooks/useModal";
import { IPriority } from "types/tasks";

const colors = {
  "Low": "var(--low)",
  "Medium": "var(--medium)",
  "High": "var(--high)",
  "Critical": "var(--critical)",
}

function Priority(props: { firstPriorytet: string, setPriorytet: (priority: string) => void }) {

  const [opened, setOpened] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onClose = () => {
    setOpened(false);
  };


  return (<>
    <button className="priority"
      onClick={() => setOpened(true)}
      ref={buttonRef}
      style={{ backgroundColor: `${props.firstPriorytet ? colors[props.firstPriorytet as IPriority] : ""}` }}>
      {props.firstPriorytet ? props.firstPriorytet : "Priority"}
      <div className="arrow" style={{ transform: `${opened ? "rotate(180deg) " : ""}` }}> &#9207;</div>
    </button>
    <Modal opened={opened} triggerRef={buttonRef} onClose={onClose} setPriorytet={props.setPriorytet} />
  </>)
}


function Modal(props: {
  opened: boolean,
  triggerRef?: React.RefObject<HTMLButtonElement>,
  setPriorytet: (priority: string) => void;
  onClose: () => void,
}) {

  const tooltipRef = useRef<HTMLDivElement>(null);

  useModal({
    elementRef: tooltipRef,
    triggerRef: props.triggerRef,
    onOutsideClick: props.onClose,
    enabled: props.opened,
  });

  const priorityList: IPriority[] = [
    IPriority.Critical,
    IPriority.High,
    IPriority.Medium,
    IPriority.Low,]

  if (!props.opened) {
    return null;
  }

  return (
    <div className="priority-area component" ref={tooltipRef}>
      {priorityList.map((priority) => {
        return <button
          className="priority-item"
          onClick={() => { props.setPriorytet(priority); props.onClose() }}
          style={{ backgroundColor: `${colors[priority]}` }}>
          {priority}
        </button>
      })}
    </div>
  );
}

export default Priority