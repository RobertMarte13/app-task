import { useTask } from "../hooks/useTaskContext";

// eslint-disable-next-line react/prop-types
const TaskCard = ({ task }) => {
  const { deleteTasks, updateTasks } = useTask();

  const handleAdd = () => {
    // eslint-disable-next-line react/prop-types
    updateTasks(task.id, { done: true });
  };

  const handleDelete = () => {
    // eslint-disable-next-line react/prop-types
    deleteTasks(task.id, { done: !task.done });
  };

  return (
    <div className="box-task-card">
      <h1 className="title-task-card">{task.name}</h1>
      <p className="done">{JSON.stringify(task.done)}</p>
      <div className="content-btn-ad">
        <button className="btn-add" onClick={() => handleAdd()}>
          add
        </button>
        <button className="btn-delete" onClick={() => handleDelete()}>
          delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
