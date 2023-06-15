/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";

function TaskContainer({ tasks, type, setReload, reload }) {
  const [title, setTitle] = useState("");
  useEffect(() => {
    if (type === "inProgress") {
      setTitle("Taches en cours");
    } else if (type === "finished") {
      setTitle("Taches terminées");
    } else {
      setTitle("Taches archivées");
    }
  });
  return (
    <div className={`${type}-container`}>
      <h3>{title}</h3>
      <Droppable droppableId={type}>
        {(provider) => (
          <div
            {...provider.droppableProps}
            ref={provider.innerRef}
            className="task-item-container"
          >
            {tasks.map((task, index) => (
              <TaskItem
                task={task}
                key={task.id}
                type={type}
                setReload={setReload}
                reload={reload}
                index={index}
              />
            ))}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default TaskContainer;
TaskContainer.propTypes = {
  tasks: PropTypes.shape.isRequired,
  type: PropTypes.string.isRequired,
  setReload: PropTypes.func.isRequired,
  reload: PropTypes.bool.isRequired,
};
