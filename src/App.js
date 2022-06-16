import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import Categories from "./Categories";
import menu from "./data";

function App() {
  const [items, setItems] = useState(menu);
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    let uniqueCategory = [];
    uniqueCategory = items.map((item) => {
      return item.category;
    });

    uniqueCategory = [...new Set(uniqueCategory)];
    setCategories(uniqueCategory);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleFilter = (category) => {
    if (category !== "all") {
      const filteredArray = menu.filter((item) => {
        if (category === item.category) return item;
      });
      setItems(filteredArray);
    } else {
      setItems(menu);
    }
  };

  return (
    <section className="menu section">
      <div className="title">
        <h2>our menu</h2>
        <div className="underline"></div>
      </div>
      <Menu categories={categories} handleFilter={handleFilter} />
      <Categories items={items} />
    </section>
  );
}

export default App;
