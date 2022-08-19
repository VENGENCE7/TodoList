import React, { useState } from "react";

import "./Todo.css";
import TodoForm from "../TodoForm/TodoForm";

import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { GiCheckMark } from "react-icons/gi";
import { GiCrossMark } from "react-icons/gi";

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? "todo-row complete" : "todo-row"}
      key={index}
    >
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.isComplete ? (
          <i className="complete-status-icon">
            <GiCrossMark />
          </i>
        ) : (
          <i className="complete-status-icon">
            <GiCheckMark />
          </i>
        )}
        {todo.text}
      </div>
      <div className="icons">
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className="delete-icon"
        />
        <TiEdit
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className="edit-icon"
        />
      </div>
    </div>
    //   )}
    // </Droppable>
  ));
};

export default Todo;
