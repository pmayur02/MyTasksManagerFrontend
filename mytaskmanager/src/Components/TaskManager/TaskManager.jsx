import { useEffect, useState } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";
import "./TaskManager.css"

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks/");
      setTasks(res.data);
    } catch (err) {
      alert("Unauthorized. Please login.");
      navigate("/");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Add Task
  const handleAdd = async () => {
    if (!form.title) {
      alert("Title is required");
      return;
    }

    try {
      await API.post("/tasks/add-tasks", form);
      resetForm();
      fetchTasks();
    } catch (err) {
      alert("Error adding task");
    }
  };

  // Set Edit Mode
  const handleEditClick = (task) => {
    setEditingId(task.id);
    setForm({
      title: task.title || "",
      description: task.description || "",
      status: task.status || "pending",
    });
  };

  // Update Task
  const handleUpdate = async () => {
    try {
      const payload = {};
        debugger
      if (form.title) payload.title = form.title;
      if (form.description) payload.description = form.description;
      if (form.status) payload.status = form.status;

      await API.put(`/tasks/update-task/${editingId}`, payload);

      setEditingId(null);
      resetForm();
      fetchTasks();
    } catch (err) {
      alert("Error updating task");
    }
  };

  // Delete Task
  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/delete-task/${id}`);
      fetchTasks();
    } catch (err) {
      alert("Error deleting task");
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      status: "pending",
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>My Tasks</h2>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Form Section */}
      <div className="task-form">
        <input
          type="text"
          name="title"
          placeholder="Task title"
          value={form.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Task description"
          value={form.description}
          onChange={handleChange}
        />

        <select name="status" value={form.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="in_progress">In progress</option>
          <option value="complete">Completed</option>
          
        </select>

        {editingId ? (
          <button className="update-btn" onClick={handleUpdate}>
            Update Task
          </button>
        ) : (
          <button className="add-btn" onClick={handleAdd}>
            Add Task
          </button>
        )}
      </div>

      {/* Task List */}
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <div>
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <small>Status: {task.status}</small>
            </div>

            <div className="task-actions">
              <button
                className="edit-btn"
                onClick={() => handleEditClick(task)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
