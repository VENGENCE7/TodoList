import React, { useEffect, useState } from "react";
import "./TodoList.css";

import TodoForm from "../TodoForm/TodoForm.js";
import Todo from "../Todo/Todo";

function TodoList() {
  const [todos, setTodos] = useState([]);

  //==================================================================retrieve Local Storage
  const retrieved_Todos = window.localStorage.getItem("Todos");

  useEffect(() => {
    const retrieved_local_Todos =
      retrieved_Todos !== null || {} ? JSON.parse(retrieved_Todos) : [];
    if (retrieved_local_Todos !== null) {
      setTodos(retrieved_local_Todos);
    }
    // eslint-disable-next-line
  }, []);

  //==================================================================set local Storage
  useEffect(() => {
    window.localStorage.clear();
    window.localStorage.setItem("Todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    console.log(...todos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removedArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>✪ Todo List ✪</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;
