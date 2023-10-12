import { useDrop } from "react-dnd"

function Drop(props: { children: any, className: string, key: string, updateStatus: (item: any, isOver: boolean, status: string) => void }) {

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "Task",
    drop: (item, monitor) => props.updateStatus(item, !!monitor.isOver(), props.className || ""),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

  return <div className={props.className} key={props.key} ref={drop}>
    {props.children}
  </div>
}

export default Drop