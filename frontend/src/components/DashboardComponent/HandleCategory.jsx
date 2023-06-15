import React, { useState } from "react";
import PropTypes from "prop-types";
import CreationCategory from "./CategoryComponent/CreationCategory";
import ModifyCategory from "./CategoryComponent/ModifyCategory";

function HandleCategory({ category, setReload, reload }) {
  const [categoryChoice, setCategoryChoice] = useState(true);
  const changeChoice = (value) => {
    if (value === "create") {
      if (!categoryChoice) {
        setCategoryChoice(true);
      }
    } else if (value === "modify") {
      if (categoryChoice) {
        setCategoryChoice(false);
      }
    }
  };
  return (
    <div className="handle-categorie">
      <h2>Gérer mes catégories</h2>
      <div className="button-category-container">
        <button type="button" onClick={() => changeChoice("create")}>
          Créer une catégorie
        </button>
        <button type="button" onClick={() => changeChoice("modify")}>
          Modifier une catégorie
        </button>
      </div>
      {categoryChoice ? (
        <CreationCategory setReload={setReload} reload={reload} />
      ) : (
        <ModifyCategory
          category={category}
          setReload={setReload}
          reload={reload}
        />
      )}
    </div>
  );
}

export default HandleCategory;
HandleCategory.propTypes = {
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
