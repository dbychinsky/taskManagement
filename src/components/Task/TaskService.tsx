import React, {ChangeEvent, ChangeEventHandler, useState} from 'react';
import {Employee} from "../../model/Employee";
import {useNavigate, useParams} from "react-router-dom";
import {server} from "../../App";
import {Task} from "../../model/Task";
import {Project} from "../../model/Project";
import TaskForm from "./TaskForm";

const TaskService = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const initialProjectList = server.getProjects();
    const initialEmployeeList = server.getEmployees();
    const initialNewTask = {
        id: '',
        status: '',
        name: '',
        executionTime: 0,
        startDate: '',
        endDate: '',
        projectId: '',
        employeeId: ''
    };

    // Получаем таску для редактирования
    const initialTask = server.getTasks().find((tasks: Task) => tasks.id === id);
    const [task, setTasks] = useState<Task>(initialTask ? initialTask : initialNewTask);
    const [projectList, setProjectList] = useState<Project[]>(initialProjectList);
    const [employeeList, setEmployeeList] = useState<Employee[]>(initialEmployeeList);

    // Установка в состояние данных из полей формы страницы Task
    const changeHandlerTask = (fieldName: string) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        if (task.id !== '') {
            setTasks({...task, [fieldName]: event.currentTarget.value});
        } else {
            const id: string = Date.now().toString();
            setTasks({...task, id, [fieldName]: event.currentTarget.value});
        }
    };

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
    };

    const onPushStorage = () => {
        server.saveTask(task);
        navigate(-1);
    };

    const onCancel = () => {
        navigate(-1);
    };

    return <TaskForm
        task={task}
        employeeList={employeeList}
        projectList={projectList}
        submitHandler={submitHandler}
        changeHandlerTask={changeHandlerTask}
        onPushStorage={onPushStorage}
        onCancel={onCancel}
    />
};

export default TaskService;