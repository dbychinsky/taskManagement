import React, {ChangeEvent, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Task} from "../../model/Task";
import TaskStatus, {taskStatuses, TaskStatusToString} from "../../model/TaskStatus";
import Label from "../Label/Label";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import {server} from "../../App";
import {Project} from "../../model/Project";
import {Employee} from "../../model/Employee";
import './../ComboboxField/Combobox.scss';

const TaskForm = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const initialNewTask = {
        id: '',
        status: TaskStatus.NOT_STARTED,
        name: '',
        executionTime: 0,
        startDate: '',
        endDate: '',
        projectId: '',
        employeeId: ''
    };
    const [newTask, setNewTask] = useState<Task>(initialNewTask);
    const [projects, setProjects] = useState<Project[]>([]);
    const [employees, setEmployee] = useState<Employee[]>([]);

    // Установка в state данных из хранилища
    useEffect(() => {
        const task = server.getTasks().find((tasks: Task) => tasks.id === id);
        if (typeof id === "undefined") {
            return setNewTask(initialNewTask);
        } else {
            return setNewTask(task)
        }
    }, [id]);

    // Получение списка проектов
    useEffect(() => {
        setProjects(server.getProjects());
    })

    // Получение списка сотрудников
    useEffect(() => {
        setEmployee(server.getEmployees());
    })

    // Установка в state данных из input
    const changeHandler = (fieldName: string | TaskStatus) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const id: string = Date.now().toString();
        setNewTask({...newTask, id, [fieldName]: event.currentTarget.value});
    }

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
    }

    const onPushStorage = () => {
        server.saveTask(newTask);
        navigate(-1);
    }

    const onCancel = () => {
        navigate(-1);
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="formRow">
                <Label text="Статус"/>
                <select onChange={changeHandler('status')} name="status">
                    <option></option>
                    {
                        taskStatuses.map((choice, index) => {
                            return <option key={index} value={choice}>{TaskStatusToString[choice]}</option>
                        })
                    }
                </select>
            </div>

            <div className="formRow">
                <Label text="Наименование"/>
                <InputField type="text" value={newTask.name} onChange={changeHandler('name')} name="name"/>
            </div>

            <div className="formRow">
                <Label text="Наименование проекта"/>
                <select onChange={changeHandler('projectId')} name="projectId">
                    <option></option>
                    {
                        projects.map((project, index) => {
                            return <option key={index} value={project.id}>{project.name}</option>
                        })
                    }
                </select>
            </div>

            <div className="formRow">
                <Label text="Работа (в часах)"/>
                <InputField type="text" value={newTask.executionTime} onChange={changeHandler('executionTime')}
                            name="description"/>
            </div>

            <div className="formRow">
                <Label text="Исполнитель"/>
                <select onChange={changeHandler('employeeId')} name="employeeId">
                    <option></option>
                    {
                        employees.map((employee, index) => {
                            return <option key={index} value={employee.id}>{employee.fullName}</option>
                        })
                    }
                </select>
            </div>

            <div className="actionBar">
                <Button onClick={onPushStorage} text="Сохранить"/>
                <Button onClick={onCancel} text="Отмена"/>
            </div>

        </form>
    );
};

export default TaskForm;