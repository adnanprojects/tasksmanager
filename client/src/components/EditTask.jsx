import React, { useState } from "react";

const EditTask = ({ task }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  //   Edit the task
  const updateTask = async (event) => {
    event.preventDefault();
    try {
      const body = { title, description, status };
      const response = await fetch(
        `http://localhost:3000/tasks/${task.task_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      window.location = "/";
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-warning rounded-5"
        data-bs-toggle="modal"
        data-bs-target={`#id${task.task_id}`}
      >
        Edit
      </button>

      <div
        className="modal form-control"
        id={`id${task.task_id}`}
        onClick={() => {
          setTitle(task.title);
          setDescription(task.description);
          setStatus(task.status);
        }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit task</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={() => {
                  setTitle(task.title);
                  setDescription(task.description);
                  setStatus(task.status);
                }}
              ></button>
            </div>

            <div className="modal-header d-flex flex-column">
              <input
                placeholder="Title"
                type="text"
                className="form-control mb-1"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
              <textarea
                placeholder="Description"
                type="text"
                className="form-control mt-1 mb-1"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />

              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="form-control mt-1"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary rounded-5"
                data-bs-dismiss="modal"
                onClick={(event) => updateTask(event)}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-danger rounded-5"
                data-bs-dismiss="modal"
                onClick={() => {
                  setTitle(task.title);
                  setDescription(task.description);
                  setStatus(task.status);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTask;
