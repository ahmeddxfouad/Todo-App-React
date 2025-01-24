import React, { useState } from "react";
import './App.css';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 

  const addTaskToArray = (taskText) => {
    const newTask = {
      id: Date.now(),
      title: taskText,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setInputValue("");
    setErrorMessage(""); // Clear the error message on successful add
  };

  const handleAddTask = () => {
    if (inputValue.trim() === "") {
      setErrorMessage("The input field is empty! You should enter something!"); // Show error message
    } else {
      addTaskToArray(inputValue.trim());
    }
  };

  const deleteTaskById = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const markTaskCompleted = (tasks, taskId) => {
    if (!tasks.length) return [];
    const [first, ...rest] = tasks;
    if (first.id === taskId) {
      return [{ ...first, completed: !first.completed }, ...markTaskCompleted(rest, taskId)];
    }
    return [first, ...markTaskCompleted(rest, taskId)];
  };

  const handleTaskClick = (e, taskId) => {
    if (e.target.classList.contains("del")) {
      deleteTaskById(taskId);
    } else {
      setTasks((prevTasks) => markTaskCompleted(prevTasks, taskId));
    }
  };

  return (
    <div className="todo-app">
      <div className="input-container">
        <input
          type="text"
          className="input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="add" onClick={handleAddTask}>
          Add
        </button>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="tasks">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`task ${task.completed ? "done" : ""}`}
            onClick={(e) => handleTaskClick(e, task.id)}
          >
            {task.title}
            <span className="del">Delete</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;

