CREATE DATABASE tasks;

CREATE TABLE task(
    task_id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    description VARCHAR(255),
    status VARCHAR(50)
);