import React from "react";
import { FaEdit, FaTrash, FaArrowUp, FaArrowDown } from "react-icons/fa";

const List = ({ lists, editItem, deleteItem, moveItem }) => {
  // console.log(lists);
  return (
    <>
      {lists.map(({ id, title, lastUpdatedOn }, index) => {
        return (
          <article key={id} className="grocery-item">
            <div>
              <p className="title">
                <span>{index + 1}. </span>
                {title}
              </p>
              <div className="updated-date">
                Last Updated On: {lastUpdatedOn}{" "}
                <div className="updown-btn">
                  <button
                    type="button"
                    className="move-btn"
                    onClick={() => moveItem(index, index - 1)}
                  >
                    <FaArrowUp />
                  </button>
                  <button
                    type="button"
                    className="move-btn"
                    onClick={() => {
                      moveItem(index, index + 1);
                    }}
                  >
                    <FaArrowDown />
                  </button>
                </div>
              </div>
            </div>
            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => editItem(id, title)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => deleteItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </>
  );
};

export default List;
