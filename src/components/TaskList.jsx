import { useEffect } from "react";
import { useTask } from "../hooks/useTaskContext";
import TaskCard from "./TaskCard";

// eslint-disable-next-line react/prop-types
const TaskList = ({ done=false }) => {
  const { tasks, getTasks } = useTask();

  useEffect(() => {
    getTasks(done);
  }, [done, getTasks]);

  function renderTasks() {
    if(tasks === null || tasks === undefined) {
      return <h1>Loadding..</h1>
    }else if (tasks.length === 0) {
      return <h1 className="message-not-task">Not tasks found</h1>
    } else {
      return (
        <div className="box-task-list">
          <h1 className="title-list">Task List:</h1>
          
          {tasks &&
            tasks.map((task) => (
              <TaskCard key={task.id}
                task={task}
              />
            ))}
        </div>
      );
    }
  }

  return (
    <div className="content-list">
      {renderTasks()}
    </div>
  )
  
};

export default TaskList;
