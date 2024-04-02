import React, { useState, useEffect } from "react";
import './TodoList.css'

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // Retrieve todos from local storage when component mounts
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []); 

  // Save todos to local storage whenever todos state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        name: inputText,
        edit: false
      };
      setTodos([...todos, newTodo]);
      setInputText("");
    }
  };

  const deleteHandle = (id) => {
    const updatedTodos = todos.filter((object) => {
      return object.id !== id;
    });
    setTodos(updatedTodos);
  };

  const handleChange = (id, value) => {
    const modifiedTodos = todos.map((item) => {
      return item.id === id ? { ...item, name: value } : item;
    });
    setTodos(modifiedTodos);
  };

  const edithandle = (id) => {
    const modifiedTodos = todos.map((item) => {
      if (item.id === id) {
        return { ...item, edit: true };
      }
      return item;
    });
    setTodos(modifiedTodos);
  };

  const updatehandle = (id) => {
    const modifiedTodos = todos.map((item) => {
      return item.id === id ? { ...item, edit: false } : item;
    });
    setTodos(modifiedTodos);
  };

  let filteredTodos = todos;
  if (searchText.length >= 4) {
    filteredTodos = todos.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  return (
    <div className="App">
      <div>
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button className="text-green-100" type="submit">
            +ADD
          </button>
        </form>
      </div>
      <div>
        {filteredTodos.map((item, i) => (
          <div className="wrapped" key={item.id}>
            <div>{i + 1}</div>
            {item.edit ? (
              <input
                type="text"
                value={item.name}
                onChange={(e) => handleChange(item.id, e.target.value)}
              />
            ) : (
              <div>{item.name}</div>
            )}

            <div className="action">
              {item.edit ? (
                <button onClick={() => updatehandle(item.id)}>
                  update
                </button>
              ) : (
                <button onClick={() => edithandle(item.id)}>edit</button>
              )}

              <button className="delete" onClick={() => deleteHandle(item.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;