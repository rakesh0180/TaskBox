import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import axios from "axios";

const TasksContainer = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  //create tasks
  const fetchTasks = (data, handelResetFormData) => {
    console.log({ data });
    axios
      .post("http://localhost:3033/api/tasks", data)
      .then((result) => {
        handelResetFormData();
        getTasksList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // read all tasks
  const getTasksList = () => {
    axios
      .get("http://localhost:3033/api/tasks")
      .then((result) => {
        setTasks(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //update task
  const updateTask = (data, handelResetFormData) => {
    axios
      .put(`http://localhost:3033/api/tasks/${data.id}`, data)
      .then((result) => {
        getTasksList();
        handelResetFormData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //delete task
  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:3033/api/tasks/${id}`)
      .then((result) => {
        getTasksList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTasksList();
  }, []);

  return (
    <div className="task-container">
      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        setEditingTask={setEditingTask}
      />
      <TaskForm
        fetchTasks={fetchTasks}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
        updateTask={updateTask}
      />
    </div>
  );
};

export default TasksContainer;
