import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Task} from "../model/Task";
import {buildUpdateTaskPath, TASK_FORM} from "../Paths";
import TaskList from "../components/Task/TaskList";
import {Employee} from "../model/Employee";
import {Project} from "../model/Project";
import {server} from "../App";
import Header from "../components/Header/Header";

const TaskPage = () => {
    const navigate = useNavigate();
    const [taskList, setTaskList] = useState<Task[]>([]);
    const [employeeList, setEmployeeList] = useState<Employee[]>([]);
    const [projectList, setProjectList] = useState<Project[]>([]);

    useEffect(() => {
        setTaskList(server.getTasks());
    }, []);

    useEffect(() => {
        setEmployeeList(server.getEmployees());
    }, []);

    useEffect(() => {
        setProjectList(server.getProjects());
    }, []);

    const addTask = () => {
        navigate(TASK_FORM);
    }

    const deleteTask = (id: string) => {
        server.deleteTask(id);
        setTaskList(server.getTasks());
    }

    const updateTask = (id: string) => {
        navigate(buildUpdateTaskPath(id!));
    }

    return (
        <div className="taskPage">
            <Header title="Список задач"
                    onClick={addTask}
                    text="Добавить"
                    isShowButton={true}/>
            <TaskList
                tasks={taskList}
                employees={employeeList}
                projects={projectList}
                deleteTask={deleteTask}
                updateTask={updateTask}/>
        </div>
    );
};

export default TaskPage;