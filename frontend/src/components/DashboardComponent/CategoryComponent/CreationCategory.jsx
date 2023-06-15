import React, { useState } from "react";
import PropTypes from "prop-types";
import useApi from "../../../services/useApi";

function CreationCategory({ setReload, reload }) {
  const api = useApi();
  const [color, setColor] = useState("#000000");
  const [name, setName] = useState("");
  const handleColor = (e) => {
    setColor(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    api
      .post(`/category`, {
        color,
        name,
      })
      .then(() => {
        setReload(!reload);
        setColor("#000000");
        setName("");
      });
  };
  return (
    <form className="create-category">
      <input
        type="text"
        maxLength={60}
        placeholder="Nom de la catégorie"
        value={name}
        onChange={handleName}
        className="create-name-cat"
      />
      <input type="color" value={color} onChange={(e) => handleColor(e)} />
      <button type="submit" onClick={(e) => handleCreate(e)}>
        Valider
      </button>
    </form>
  );
}

export default CreationCategory;

CreationCategory.propTypes = {
  setReload: PropTypes.func.isRequired,
  reload: PropTypes.bool.isRequired,
};
