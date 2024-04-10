import React, { useEffect, useState } from "react";

const ToDoList = () => {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');

    useEffect(()=>{loadTask()},[] );
    
    function loadTask() {
        fetch('https://playground.4geeks.com/todo/users/Fali1980')
                .then(resp => { return resp.json(); })
                .then(data => { setTasks(data.todos)})
                .catch(error => { console.log(error); });
    }

    const handleTaskInputChange = event => {
        setTaskInput(event.target.value);
    };

    const handleKeyDown = event => {
        if (event.key === 'Enter' && taskInput.trim() !== '') {
            setTaskInput('');
            fetch('https://playground.4geeks.com/todo/todos/Fali1980', {
                                method: 'POST',
                                body: JSON.stringify({"label": taskInput}),
                                headers: { "Content-Type": "application/json" }
                            })
                            .then(resp => { return resp.json(); })
                            .then(loadTask())
                            .catch(error => { console.log(error); });

        }

    };

    const handleDeleteTask = index => {
    
        fetch(`https://playground.4geeks.com/todo/todos/${index}`, {
                method: 'DELETE',
                headers: { 'Accept': 'application/json' }
            })
            .then(loadTask())
            .catch(error => { console.error(error); });

    };

        

    return (
        <div className="container bg-info pb-5">
            <div className="row">
                <div className="col text-center">
                    <h1>TODOS</h1>
                </div>
            </div>
            <div className="row">
                <div className="col text-center">
                    <div className="form-group">
                        <label htmlFor="taskInput" className="fs-3">
                            <i className="fa-solid fa-pencil"></i>
                            Añade tu tarea a realizar
                            <i className="fa-solid fa-pencil"></i>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="taskInput"
                            placeholder="Escribe aquí tu tarea"
                            value={taskInput}
                            onChange={handleTaskInputChange}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <ul className="list-group">
                        {tasks.map((task, index) => (
                            <li className="list-group-item taskLi d-flex justify-content-between align-items-center fw-bold" key={index}>
                                {task.label}
                                <span onClick={() => handleDeleteTask(task.id)}>
                                    <i className="fa-regular fs-3 fa-circle-xmark iconX"></i>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <ul className="list-group mt-3">
                        {tasks.length === 0 && (
                            <li className="list-group-item counterTask fw-bold">No tienes tareas pendientes</li>
                        )}
                        {tasks.length === 1 && (
                            <li className="list-group-item counterTask fw-bold">{tasks.length} Tarea pendiente</li>
                        )}
                        {tasks.length > 1 && (
                            <li className="list-group-item counterTask fw-bold">{tasks.length} Tareas pendientes</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ToDoList;
