import React, { useEffect, useState } from "react";
import EditTask from "./EditTask";

function ListTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  //   Delete a task
  const deleteTask = async (id) => {
    try {
      const deleteTask = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((task) => task.task_id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await fetch("http://localhost:3000/tasks");
        const result = await response.json();
        setTasks(result);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setLoading(false);
      }
    };
    getTasks();
  }, []);

  if (loading) {
    return <h2 className="text-center">Loading ...</h2>;
  }

  if (!tasks.length) {
    return <h2 className="text-center text-black-50">No Data Available</h2>;
  }

  return (
    <table className="table table-hover text-center mt-5">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.task_id}>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>{task.status}</td>
            <td className="d-flex flex-wrap justify-content-evenly">
              <EditTask task={task} />
              <button
                className="btn btn-danger rounded-5"
                onClick={() => deleteTask(task.task_id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ListTasks;
