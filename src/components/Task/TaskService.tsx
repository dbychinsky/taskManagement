import React, {useState} from 'react';
import {Employee} from "../../model/Employee";
import {useNavigate, useParams} from "react-router-dom";
import {server} from "../../App";
import {Task} from "../../model/Task";
import {Project} from "../../model/Project";
import TaskForm from "./TaskForm";
import {TaskStatus} from "../../util/convertToStrTaskStatus";

const TaskService = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const initialProjectList = server.getProjects();
    const initialEmployeeList = server.getEmployees();
    const initialNewTask: Task = {
        id: '',
        status: TaskStatus.NotStarted,
        name: '',
        executionTime: null,
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
    const changeHandlerTask = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        if (task.id !== '') {
            setTasks({...task, [e.currentTarget.name]: e.currentTarget.value});
        } else {
            const id: string = Date.now().toString();
            setTasks({...task, id, [e.currentTarget.name]: e.currentTarget.value});
        }
        console.log(task)
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