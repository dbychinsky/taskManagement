import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Task} from "../model/Task";
import Button from "../components/Button/Button";
import {buildUpdateTaskPath, PROJECT_FORM, TASK_FORM} from "../Paths";
import TaskList from "../components/Task/TaskList";
import {taskServer} from "../server/task/TaskServer";
import {Employee} from "../model/Employee";
import {Project} from "../model/Project";
import {employeeServer} from "../server/employee/EmployeeServer";
import {projectServer} from "../server/project/ProjectServer";

const TaskPage = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        setTasks(taskServer.getTasks());
    }, []);

    useEffect(() => {
        setEmployees(employeeServer.getEmployees());
    }, []);

    useEffect(() => {
        setProjects(projectServer.getProjects());
    }, []);

    const addTask = () => {
        navigate(TASK_FORM);
    }

    const deleteTask = (id: string) => {
        taskServer.deleteTask(id);
        setTasks(taskServer.getTasks());
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