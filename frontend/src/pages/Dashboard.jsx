import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import TaskContainer from "../components/DashboardComponent/TaskContainer";
import useApi from "../services/useApi";
import statusTask from "../utils/StatusTask";
import CreationTask from "../components/DashboardComponent/CreationTask";
import "../assets/styles/dashboard.css";
import HandleCategory from "../components/DashboardComponent/HandleCategory";
import { useUser } from "../contexts/UserContext";

function Dashboard() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [progressTask, setProgressTask] = useState([]);
  const [finishedTask, setFinishedTask] = useState([]);
  const [archivedTask, setArchivedTask] = useState([]);
  const [category, setCategory] = useState([]);
  const [reload, setReload] = useState(true);

  const api = useApi();
  useEffect(() => {
    api.get("/category").then((res) => {
      setCategory(res.data);
    });
  }, [reload]);

  if (!user) {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }
  useEffect(() => {
    api
      .get("/task")
      .then((res) => {
        setProgressTask(
          res.data.filter(
            (task) => task.status_task_id === statusTask.inProgress
          )
        );
        setFinishedTask(
          res.data.filter((task) => task.status_task_id === statusTask.finished)
        );
        setArchivedTask(
          res.data.filter((task) => task.status_task_id === statusTask.archived)
        );
      })
      .catch((err) => {
        console.warn(err);
      });
  }, [reload]);

  const onDragEnd = () => {
    console.warn("toto");
  };

  return (
    <div className="dashboard">
      {user ? (
        <>
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="task-container">
              <TaskContainer
                tasks={progressTask}
                type="inProgress"
                setReload={setReload}
                reload={reload}
                key="inprogress"
                column="inprogress"
              />
              <TaskContainer
                tasks={finishedTask}
                type="finished"
                setReload={setReload}
                reload={reload}
                key="finished"
                column="finished"
              />
              <TaskContainer
                tasks={archivedTask}
                type="archived"
                setReload={setReload}
                reload={reload}
                key="archived"
                column="archived"
              />
            </div>
          </DragDropContext>
          <div className="creation-container">
            <CreationTask
              category={category}
              setReload={setReload}
              reload={reload}
            />
            <HandleCategory
              category={category}
              setReload={setReload}
              reload={reload}
            />
          </div>
        </>
      ) : (
        <p>Vous n'êtes pas connecté</p>
      )}
    </div>
  );
}

export default Dashboard;
