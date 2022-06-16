import React from "react";

const Menu = ({ categories, handleFilter }) => {
  return (
    <div className="btn-container">
      <button
        type="button"
        className="filter-btn"
        value="all"
        onClick={() => handleFilter("all")}
      >
        all
      </button>
      {categories.map((category, index) => {
        return (
          <button
            type="button"
            className="filter-btn"
            key={index}
            onClick={() => handleFilter(category)}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default Menu;
