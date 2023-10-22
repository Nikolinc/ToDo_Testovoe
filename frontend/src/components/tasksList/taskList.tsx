import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import './taskList.css'
import { useDispatch, useSelector } from 'react-redux';
import { TaskSelector, fecthTasks, uploadTask } from 'store/tasks/reducer';
import { IStatus, ITask } from 'types/tasks';
import Drop from 'components/tasksList/Drop/Drop';
import ItemTask from './itemTask/itemTask';



function TaskList() {

  const dispatch = useDispatch();
  const params = useParams();
  const payload = { id: params.id || "" };
  const tasks: ITask[] = useSelector(TaskSelector.getTask);

  const [searchParams] = useSearchParams({ q: "" });
  const q = searchParams.get("q") || "";

  const filter = (task: ITask, status: IStatus) => task.currentStatus === status &&
    (task.title.toUpperCase().indexOf(q.toUpperCase()) !== -1 ||
      task.description.toUpperCase().indexOf(q.toUpperCase()) !== -1);


  useEffect(() => {
    dispatch(fecthTasks(payload));
  }, []);

  const columns = [{ key: 0, title: "Queue", status: IStatus.Queue }, { key: 1, title: "Development", status: IStatus.Development }, { key: 2, title: "Done", status: IStatus.Done }]


  const updateStatus = async (item: any, isOver: boolean, status: string) => {
    if (!isOver) return;

    await dispatch(uploadTask({
      id: item._id,
      params: 'currentStatus',
      value: status
    }));
  }


  return (<div className="taskList">
    {columns.map((column) => {
      return (
        <Drop className={column.title} key={column.title} updateStatus={updateStatus}>
          <h2>{column.title}</h2>
          {tasks.filter((task: ITask) => filter(task, column.status))?.map((task: ITask) => {
            return <ItemTask task={task} />
          })}
        </Drop>)
    })}
  </div >)

}

export default TaskList