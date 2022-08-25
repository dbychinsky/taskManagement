import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Task} from "../model/Task";
import Button from "../components/Button/Button";
import {buildUpdateTaskPath, PROJECT_FORM, TASK_FORM} from "../Paths";
import TaskList from "../components/Task/TaskList";
import {Employee} from "../model/Employee";
import {Project} from "../model/Project";
import {server} from "../App";

const TaskPage = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        setTasks(server.getTasks());
    }, []);

    useEffect(() => {
        setEmployees(server.getEmployees());
    }, []);

    useEffect(() => {
        setProjects(server.getProjects());
    }, []);

    const addTask = () => {
        navigate(TASK_FORM);
    }

    const deleteTask = (id: string) => {
        server.deleteTask(id);
        setTasks(server.getTasks());
    }

    const updateTask = (id: string) => {
        navigate(buildUpdateTaskPath(id!));
    }

    return (
        <div className="taskPage">

            <div className="actionBar">
                <Button onClick={addTask} text={"Добавить"}/>
            </div>

            <TaskList task={tasks} employees={employees} projects={projects} deleteTask={deleteTask}
                      updateTask={updateTask}/>
        </div>
    );
};

export default TaskPage;