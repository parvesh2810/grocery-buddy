import React, { useEffect, useState } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const [lists, setLists] = useState(getLocalStorage());
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const addTolist = (e) => {
    e.preventDefault();
    if (name === "") {
      alertItem("danger", "Plese Enter a Value");
    } else if (name !== "" && isEdit) {
      const check = lists.findIndex(
        (list) => list.title.toLowerCase() === name.toLowerCase()
      );
      if (check === -1) {
        const updatedList = lists.map((list) => {
          if (list.id === editId) {
            return {
              ...list,
              title: name,
              lastUpdatedOn: new Date().toLocaleString("en-IN"),
            };
          }
          return list;
        });
        alertItem("success", "Item Updated in the list");
        setLists(updatedList);
      } else {
        alertItem("danger", "Item already added to the list");
      }
      setIsEdit(false);
    } else {
      const check = lists.findIndex(
        (list) => list.title.toLowerCase() === name.toLowerCase()
      );
      // console.log(check);
      if (check === -1) {
        const myDate = new Date();
        const newItem = {
          id: myDate.getTime().toString(),
          title: name,
          lastUpdatedOn: myDate.toLocaleString("en-IN"),
        };
        setLists([...lists, newItem]);
        alertItem("success", "Item added to the list");
      } else {
        alertItem("danger", "Item already added to the list");
      }
    }
    setName("");
  };

  const deleteItem = (id) => {
    const newList = lists.filter((list) => {
      return list.id !== id;
    });
    if (newList.length === 0) setLists([]);
    setLists(newList);
  };

  const editItem = (id, title) => {
    setIsEdit(true);
    setName(title);
    setEditId(id);
  };

  const moveItem = (currIndex, toMoveIndex) => {
    // console.log(toMoveIndex);
    const modifiedList = [...lists];
    // const modifiedList = lists.slice(0, lists.length);
    if (toMoveIndex === -1) {
      modifiedList.splice(
        lists.length,
        0,
        modifiedList.splice(currIndex, 1)[0]
      );
    } else if (toMoveIndex === lists.length) {
      modifiedList.splice(0, 0, modifiedList.splice(currIndex, 1)[0]);
    } else {
      modifiedList.splice(toMoveIndex, 0, modifiedList.splice(currIndex, 1)[0]);
    }
    // console.log(modifiedList);
    setLists(modifiedList);
  };

  const resetAll = () => {
    setLists([]);
    alertItem("danger", "Item already added to the list");
  };

  const alertItem = (type, message, show = true) => {
    setAlert({
      show: show,
      type: type,
      message: message,
    });
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(lists));
  }, [lists]);

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={addTolist}>
        {alert.show && <Alert {...alert} setAlert={setAlert} />}
        <h3>grocery buddy</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEdit ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {lists.length > 0 && (
        <div className="grocery-container">
          <div className="grocery-list">
            <List
              lists={lists}
              editItem={editItem}
              deleteItem={deleteItem}
              moveItem={moveItem}
            />
          </div>
          <button className="clear-btn" onClick={resetAll}>
            clear all items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
