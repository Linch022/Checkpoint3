import React, { useState } from "react";
import PropTypes from "prop-types";
import { useUser } from "../../contexts/UserContext";
import useApi from "../../services/useApi";

function CreationTask({ category, reload, setReload }) {
  const { user } = useUser();
  const api = useApi();
  const [selectColor, setSelectColor] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [duration, setDuration] = useState();
  const [categoryId, setCategoryId] = useState();

  const handleCat = (e) => {
    const selectedCat = JSON.parse(e.target.value);
    setSelectColor(selectedCat.color);
    setCategoryId(selectedCat.id);
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    api
      .post("/task", {
        title,
        categoryId,
        description,
        duration,
        userId: user.id,
      })
      .then(() => {
        setReload(!reload);
      });
  };
  return (
    <div className="create-task-container">
      <h2>Créer une nouvelle tache</h2>
      <form className="create-task-form">
        <input
          type="text"
          name="taskTitle"
          id="taskTitle"
          placeholder="Titre de la tache"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name="taskDescr"
          id="taskDescr"
          placeholder="Description"
          maxLength={245}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="durationTask">
          Durée de la tâche:{" "}
          <input
            type="number"
            id="durationTask"
            name="durationTask"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value, 10))}
            placeholder="0"
            min={0}
          />
          min
        </label>
        <select
          name="categoryTask"
          id="categoryTask"
          style={{ backgroundColor: `${selectColor}` }}
          onChange={(e) => handleCat(e)}
        >
          <option
            value={JSON.stringify({
              color: "#FFFFFF",
              id: null,
            })}
            style={{ backgroundColor: "white" }}
          >
            Choississez la catégorie
          </option>
          {category.map((cat) => (
            <option
              value={JSON.stringify(cat)}
              key={cat.id}
              style={{ backgroundColor: `${cat.color}` }}
            >
              {cat.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          onClick={handleCreateTask}
          disabled={!(title && description && duration && categoryId)}
        >
          Valider
        </button>
      </form>
    </div>
  );
}

export default CreationTask;
CreationTask.propTypes = {
  category: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  setReload: PropTypes.func.isRequired,
  reload: PropTypes.bool.isRequired,
};
