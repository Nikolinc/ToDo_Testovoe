import { useDrag } from "react-dnd";
import { ITask } from "types/tasks";
import { ReactComponent as Calendar } from "assets/calendar.svg";
import './itemTask.css'

function ItemTask(props: { task: ITask }) {

  const [collected, drag,] = useDrag(() => ({
    type: "Task",
    item: props.task,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  const getDate = (date: any) => new Date(date).toLocaleDateString();

  const colors = {
    "Low": "var(--low)",
    "Medium": "var(--medium)",
    "High": "var(--high)",
    "Critical": "var(--critical)",
  }

  return (<button className='openTask' key={props.task._id}>
    <div className="task" style={{ backgroundColor: colors[props.task.priority], }} ref={drag}>
      <h3>{props.task.title}</h3>
      <div className="date">
        <Calendar width="1rem" /> {getDate(props.task.createDate)} <h4>to</h4> <Calendar width="1rem" /> {getDate(props.task.expirationDate)}
      </div>
      <div className="description">
        {props.task.description}
      </div>
      <div className="badge">
        {props.task.priority}
      </div>
    </div>
  </button>)
}

export default ItemTask