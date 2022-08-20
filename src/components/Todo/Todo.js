import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

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
    <>
      <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={todo.isComplete ? "todo-row complete" : "todo-row"}
            key={todo.id}
          >
            <div key={todo.id} onClick={() => completeTodo(todo.id)}>
              {todo.isComplete ? (
                <i className="complete-status-icon-cross">
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
        )}
      </Draggable>
    </>
  ));
};

export default Todo;
