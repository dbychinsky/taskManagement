import React, {ChangeEvent, useState} from 'react';
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

    // Получаем таску для редактирования
    // const initialTask: Task = requestTask(id);

    const [task, setTasks] = useState(requestTask(id));
    const [projectList, setProjectList] = useState<Project[]>(initialProjectList);
    const [employeeList, setEmployeeList] = useState<Employee[]>(initialEmployeeList);

    // Запрашиваем таску или создаем новую
    function requestTask(id: string): Task {
        const target = server.getTasks().find((tasks: Task) => tasks.id === id);
        if (target) {
            return target
        } else return new Task();
    }

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
    };

    const onPushStorage = (task: Task) => {
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
        onPushStorage={onPushStorage}
        onCancel={onCancel}
    />
};

export default TaskService;