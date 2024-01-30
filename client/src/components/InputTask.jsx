import React, { useState } from "react";

const inputTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");

  // Create a task
  const onSubmitForm = async (event) => {
    event.preventDefault();
    try {
      const body = { title, description, status };
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/";
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <h1 className="text-center mt-4">Task Manager</h1>
      <form
        onSubmit={onSubmitForm}
        className="form-control d-flex flex-wrap justify-content-around align-items-center  mt-3 p-3"
      >
        <label htmlFor="title">
          Title : &nbsp;
          <input
            className="rounded-1 p-1"
            id="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          ></input>
        </label>

        <label htmlFor="description">
          Description : &nbsp;
          <textarea
            className="rounded-1 p-2"
            style={{ verticalAlign: "middle" }}
            id="description"
            name="bio"
            rows="3"
            cols="50"
            placeholder="Describe your title here ..."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
        </label>

        <label htmlFor="status">
          Status : &nbsp;
          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
            }}
            className="p-1 rounded-1"
            id="status"
            name="status"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
        <button className="btn btn-success rounded-5">Add Task</button>
      </form>
    </>
  );
};

export default inputTask;
