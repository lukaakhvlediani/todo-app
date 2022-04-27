import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { ControlPanel } from "./ControlPanel";
import { Item } from "./Item";
import "./Input.css";

export const Input = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const [edit, setEdit] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const headers = {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjI2MjY0YTkzOGZhNWQ2ODc1M2E4NGJlIiwiZW1haWwiOiJkZWRpc3RyYWtpQC5jb20ifSwiaWF0IjoxNjUwNjIwMDAwfQ.dNt224M8gSO-2OXUyscyzwGn_Cp0hQgypgUQPHrf0ac",
  };

  const refreshTable = () => {
    axios
      .get("http://localhost:4000/get-todos?filterStatus=all", {
        headers,
      })

      .then((response) => {
        const { data } = response.data;
        setFiltered(data);
        setTodos(data);
      });
  };
  useEffect(() => {
    refreshTable();
  }, []);

  const handleChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const body = {
        name: newTodo,
        checked: false,
      };

      if (newTodo.length) {
        const response = await axios.post(
          "http://localhost:4000/add-todos",
          {
            ...body,
          },
          {
            headers,
          }
        );

        const { data } = response.data;

        setTodos([...todos, data]);
        setFiltered([...filtered, data]);

        setNewTodo("");
      }
    } catch (error) {
      console.log(error, "added todos catch");
    }
  };

  const checkbox = (index, id, isChecked) => {
    axios
      .put(
        `http://localhost:4000/${id}/update-checkbox`,
        {
          body: {
            checked: isChecked,
          },
        },
        {
          headers,
        }
      )
      .then((res) =>
        setTodos([...todos, (res.data.checked = !res.data.checked)])
      );

    const check = [...todos];
    check[index].checked = !check[index].checked;

    setTodos(check);
  };

  const checkall = () => {
    todos.map((todo) => {
      todo.checked = !todo.checked;
    });
  };

  const handleDeleteTodos = async () => {
    let ids = [];
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].checked) {
        ids.push(todos[i]._id);
      }
    }
    await axios.delete("http://localhost:4000/delete-todos", {
      headers,
      body: {
        ids: ids,
      },
    });
  };

  const handleEditing = async (id) => {
    const index = todos.findIndex((item) => item._id === id);
    todos[index].editing = !todos[index].editing;
    setEdit(!edit);

    const res = await axios.put(
      `http://localhost:4000/${todos[index]._id}/update-todos`,
      {
        body: {
          checked: false,
        },
      },
      {
        headers,
      }
    );

    setTodos([...todos]);
    setFiltered([...todos]);
  };

  const filterTasks = (value) => {
    let completed = [...todos];
    let active = [...todos];

    switch (value) {
      case "completed":
        let comp = completed.filter((todo) => todo.checked);

        setFiltered(comp);
        return;

      case "active":
        let act = active.filter((todo) => !todo.checked);
        setFiltered(act);
        return;

      case "all":
        setFiltered([...todos]);
        return;

      case "clear":
        handleDeleteTodos();
        setFiltered(todos.filter((x) => !x.checked));
        setTodos(todos.filter((item) => !item.checked));
        return;
    }
  };

  return (
    <div>
      <button onClick={() => checkall()}>check all</button>
      <form onSubmit={handleSubmit}>
        <ul className="block">
          <input
            type="text"
            value={newTodo}
            onChange={handleChange}
            placeholder="what needs to be done?"
          />
          <Item
            headers={headers}
            todos={todos}
            checkbox={checkbox}
            handleEditing={handleEditing}
            edit={edit}
            setNewTodo={setNewTodo}
            handleChange={handleChange}
            setEdit={setEdit}
            setTodos={setTodos}
            filtered={filtered}
            setFiltered={setFiltered}
            refreshTable={refreshTable}
          />
        </ul>
        <ControlPanel todos={todos} filterTasks={filterTasks} />
      </form>
    </div>
  );
};
