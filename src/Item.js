import React, { useRef, useState } from "react";
import axios from "axios";

export const Item = ({
  todos,
  checkbox,
  handleEditing,
  setTodos,
  filtered,
  setEdit,
  headers,
  isChecked,
  setFiltered,
  refreshTable,
}) => {
  const [checked, setChecked] = useState(true);
  const inputRef = useRef();

  const handlecheck = (index, id, checked) => {
    setChecked(!checked);
    checkbox(index, id, checked);
  };
  const handleEdit = async (id, index) => {
    const res = await axios.put(
      `http://localhost:4000/${id}/update-todos`,
      {
        body: {
          name: inputRef.current?.value,
          checked: false,
        },
      },
      {
        headers,
      }
    );

    refreshTable();
  };

  return (
    <div>
      {filtered &&
        filtered.map((todo, index) => {
          return (
            <div key={todo.index}>
              <input
                className="block"
                onChange={() => handlecheck(index, todos[index]._id, checked)}
                checked={todo.checked ? true : false}
                type="checkbox"
              />

              {todo.editing ? (
                <input
                  ref={inputRef}
                  type="text"
                  className="item"
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleEdit(todo?._id, index);
                      todo.editing = !todo.editing;
                    }
                  }}
                />
              ) : (
                <li
                  onDoubleClick={() => handleEditing(todo._id)}
                  className="item"
                >
                  {todo.name}
                </li>
              )}
            </div>
          );
        })}
    </div>
  );
};
