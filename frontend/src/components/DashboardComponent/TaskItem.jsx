import PropTypes from "prop-types";
import useApi from "../../services/useApi";
import statusTask from "../../utils/StatusTask";

function TaskItem({ task, type, setReload, reload }) {
  const api = useApi();
  const { duration } = task;

  const handleStatus = (e) => {
    const taskId = e.target.value;

    if (type === "inProgress") {
      api
        .put(`/task/${taskId}`, {
          status_task_id: statusTask.finished,
        })
        .then(() => {
          setReload(!reload);
        });
    } else if (type === "finished") {
      api
        .put(`/task/${taskId}`, {
          status_task_id: statusTask.archived,
        })
        .then(() => {
          setReload(!reload);
        });
    }
  };
  return (
    <div className="task-item" style={{ backgroundColor: `${task.color}` }}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      {duration < 60 ? (
        <p>{duration} min</p>
      ) : (
        <p>
          {Math.floor(duration / 60)}h{duration % 60}min
        </p>
      )}

      {task.status_task_id === statusTask.inProgress ||
      task.status_task_id === statusTask.finished ? (
        <label htmlFor={`${type}-${task.id}`}>
          {task.status_task_id === statusTask.inProgress
            ? "Terminer"
            : "Archiver"}
          <input
            type="checkbox"
            name={`${type}-${task.id}`}
            id={`${type}-${task.id}`}
            onChange={handleStatus}
            value={task.id}
          />
        </label>
      ) : null}
    </div>
  );
}

export default TaskItem;
TaskItem.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    isfavorite: PropTypes.number.isRequired,
    status_task_id: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  type: PropTypes.string.isRequired,
  setReload: PropTypes.func.isRequired,
  reload: PropTypes.bool.isRequired,
};
