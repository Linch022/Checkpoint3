import React, { useState } from "react";
import PropTypes from "prop-types";
import useApi from "../../../services/useApi";

function ModifyCategory({ category, setReload, reload }) {
  const api = useApi();
  const [color, setColor] = useState();
  const [name, setName] = useState();
  const [id, setId] = useState();

  const handleCat = (e) => {
    const selectedCat = JSON.parse(e.target.value);
    setColor(selectedCat.color);
    setName(selectedCat.name);
    setId(selectedCat.id);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleColor = (e) => {
    setColor(e.target.value);
  };

  const handleModify = (e) => {
    e.preventDefault();
    api
      .put(`/category/${id}`, {
        color,
        name,
      })
      .then(() => {
        setReload(!reload);
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    api.delete(`category/${id}`).then(() => {
      setReload(!reload);
    });
  };

  return (
    <form className="modify-category">
      <select
        name="cat-modify-choice"
        id="cat-modify-choice"
        style={{ backgroundColor: `${color}` }}
        onChange={(e) => handleCat(e)}
      >
        <option
          value={JSON.stringify({
            color: "#FFFFFF",
            name: "",
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
      <input
        type="text"
        maxLength={60}
        value={name}
        onChange={handleName}
        placeholder="Modifier le nom"
        disabled={!id}
      />
      <label htmlFor="change-color">Changer la couleur :</label>
      <input
        id="change-color"
        type="color"
        value={color}
        onChange={(e) => handleColor(e)}
        className="modif-color-cat"
        disabled={!id}
      />
      <button
        type="submit"
        onClick={(e) => handleModify(e)}
        className="submit-modif-cat"
      >
        Valider
      </button>
      <button
        type="submit"
        onClick={(e) => handleDelete(e)}
        className="delete-cat"
      >
        Supprimer
      </button>
    </form>
  );
}

export default ModifyCategory;
ModifyCategory.propTypes = {
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
