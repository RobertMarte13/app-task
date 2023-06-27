import { supabase } from "../supabase/supabase";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useState } from "react";

const Home = () => {
  const [showTask, setShowTask] = useState(false);

  return (
    <div className="box-main">
      <div className="content-logout">
        <button className="btn-logout" onClick={() => supabase.auth.signOut()}>
          logout
        </button>
      </div>
      <h1 className="title">Home</h1>
      <TaskForm />
      <header className="header">
        <h3 className="title-h3">Task list pending</h3>
        <button className="btn-show-task" onClick={() => setShowTask(!showTask)}>Show Task</button>
      </header>

      <TaskList done={showTask} />
    </div>
  );
};

export default Home;
