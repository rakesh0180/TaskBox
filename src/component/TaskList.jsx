import React, { useEffect } from "react";
import axios from "axios";

const TaskList = (props) => {
  const { tasks, deleteTask, setEditingTask } = props;
  console.log({ tasks });

  const handleDelete = (id) => {
    deleteTask(id);
  };
  const handleEdit = (task) => {
    setEditingTask(task);
  };

  return (
    <div className="task-list">
      {tasks.length > 0 ? (
        <div>
          <h2>Task List</h2>
          {tasks.map((task) => (
            <div key={task.id} className="task-list-item">
              <div className="task-title">{task.title}</div>
              <div className={task.status ? "completed" : "not-completed"}>
                {task.status ? "Completed" : "Not Completed"}
              </div>
              <div className="task-list-item-setting">
                <button
                  className="task-action-button edit"
                  onClick={() => {
                    handleEdit(task);
                  }}
                >
                  Edit
                </button>
                <button
                  className="task-action-button delete"
                  onClick={() => {
                    handleDelete(task.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-data">
          <h2>No Task</h2> <p>Add first task</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
