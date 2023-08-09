import React, { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
import { useDispatch } from "react-redux";
const TaskForm = (props) => {
  const { editingTask, setEditingTask, updateTask } = props;
  console.log("edit", editingTask);
  const [formData, setFormData] = useState({ title: "", status: false });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        status: editingTask.status,
      });
    } else {
      setFormData({
        title: "",
        status: false,
      });
    }
  }, [editingTask]);

  const [titleError, setTitleError] = useState([]);
  // const dispatch = useDispatch();
  const handelResetFormData = () => {
    setEditingTask(null);
    setFormData({
      title: "",
      status: false,
    });
  };

  const handleClick = () => {
    if (formData.title.trim() === "") {
      setTitleError("Title is required");
    } else {
      let data = {
        title: formData.title,
        status: formData.status,
      };
      if (editingTask) {
        data = {
          id: editingTask.id,
          title: formData.title,
          status: formData.status,
        };
        console.log("update");
        updateTask(data, handelResetFormData);
      } else {
        console.log("create");
        props.fetchTasks(data, handelResetFormData);
      }
    }
  };
  const handleChange = (event) => {
    console.log(event);
    const { name, value, checked } = event.target;
    if (name === "title") {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
      setTitleError("");
    }
    if (name === "checkbox") {
      setFormData((prevData) => ({ ...prevData, status: checked }));
    }
  };

  return (
    <div className="task-form">
      <h2>{editingTask ? "Edit " : "Add "}Task</h2>
      <div className="form-field">
        <label htmlFor="task-title">Enter the task</label>
        <input
          type="text"
          name="title"
          id="task-title"
          value={formData.title}
          onChange={handleChange}
        />
        {titleError && <p className="error">{titleError}</p>}
      </div>
      <div className="form-field">
        <label htmlFor="task-checkbox">completed</label>
        <input
          type="checkbox"
          name="checkbox"
          id="task-checkbox"
          checked={formData.status}
          onChange={handleChange}
        />
      </div>
      <br />
      <button type="submit" onClick={handleClick}>
        Save{" "}
      </button>
    </div>
  );
};

export default TaskForm;
