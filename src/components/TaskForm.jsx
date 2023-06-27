import { useState } from "react";
import { useTask } from "../hooks/useTaskContext";

const TaskForm = () => {
  const [taskName, setTaskName] = useState();

  const { createTasks } = useTask()


  const handleSubmit = async (evt) => {
    evt.preventDefault();
    
    createTasks(taskName)
    setTaskName("")
  };

  return (
    <div className="content-form">
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input-task"
          type="text"
          name="taskName"
          placeholder="Write a task name"
          onChange={(evt) => setTaskName(evt.target.value)}
          value={taskName}
        />
        <button className="btn-add-form">
          add
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
