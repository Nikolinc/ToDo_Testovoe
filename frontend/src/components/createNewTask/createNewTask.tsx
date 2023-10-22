import { useRef, useState } from 'react';
import './createNewTask.css'
import ReactDOM from 'react-dom';
import { ReactComponent as CloseIcon } from "assets/close.svg";
import { ReactComponent as FileIcon } from "assets/file.svg";
import Calendar from 'components/calendar/calendar';
import TimePicker from 'components/timePicker/timePicer';
import Priority from 'components/priority/priority';
import { useDispatch } from 'react-redux';
import { createTask } from 'store/tasks/reducer';
import { useParams } from 'react-router-dom';


function CreateTask() {
  const [opened, setOpened] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (<>
    <button className="new-task" onClick={() => setOpened(!opened)}
      ref={buttonRef}><p>New Task</p></button>
    <ModalCreateTask
      opened={opened}
      triggerRef={buttonRef}
      onClose={() => setOpened(false)} />
  </>)
}

function ModalCreateTask(props: ITooltipProps) {

  const d = new Date();
  d.setHours(d.getHours() + 2);

  const tooltipRef = useRef<HTMLDivElement>(null);
  const portal = document.getElementById("portal") as HTMLElement;
  const dispatch = useDispatch();
  const params = useParams();
  const project = { id: params.id || "" };
  const [file, setFile] = useState<File | null>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriorytet] = useState("");
  const [createDate, setCreateDate] = useState(new Date());
  const [expirationDate, setExpirationDate] = useState(new Date());

  const changeCreateDate = (data: Date) => {
    if (data <= expirationDate) {
      setCreateDate(data);
    }
  }

  const changeExpirationDate = (data: Date) => {
    if (expirationDate <= data) {
      setExpirationDate(data);
    }
  }


  const create = () => {
    const payload = {
      title: title,
      description: description,
      project: params.id,
      priority: priority,
      createDate: createDate.toISOString(),
      expirationDate: expirationDate.toISOString(),
    };
    dispatch(createTask(payload));
    console.log("payload", payload);
    props.onClose()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log("file", e.target.files[0]);
    }
    console.log("file", e.target);
  }
  if (!props.opened) return null;

  return ReactDOM.createPortal(
    <div className="overlay-style">
      <div className="modalCreateTask container component" ref={tooltipRef}>
        <div className="header-modal">
          <h2>Create Task</h2>
          <div className="buttons">
            <button className="new-task" onClick={() => create()} >Create</button>
            <button onClick={props.onClose} ><CloseIcon /></button>
          </div>
        </div>
        <div className="create-task-area">
          <div className='create-task'>
            <input
              type="title"
              id="title"
              placeholder="Title..."
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTitle(e.target.value.slice(0, 50));
              }}
            />
            <div className="date flex-center">
              <Calendar date={createDate} setDate={changeCreateDate} left='5rem' />
              <TimePicker date={createDate} setDate={changeCreateDate} left='10rem' />
              TO
              <Calendar date={expirationDate} setDate={changeExpirationDate} left='20rem' />
              <TimePicker date={expirationDate} setDate={changeExpirationDate} left='25rem' />
            </div>
            <div className="flex-center priority-file">
              <Priority firstPriorytet={priority} setPriorytet={setPriorytet} />
              <label className="task-file flex-center" htmlFor="file-input"><h4>Add file</h4> <FileIcon width="1.3rem" />
                <input
                  type="file"
                  hidden
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => console.log("file", e.target)}
                />
              </label>
            </div>
            <textarea
              placeholder="Description..."
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div className="comments">
            <input type="text" placeholder="Comments ..." />
          </div>
        </div>
      </div>

    </div >, portal)
}

export default CreateTask