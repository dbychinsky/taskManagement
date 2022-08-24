import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Task} from "../../model/Task";
import TaskStatus from "../../model/TaskStatus";
import {taskServer} from "../../server/task/TaskServer";
import Label from "../Label/Label";
import Input from "../Input/Input";
import Button from "../Button/Button";

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

    // Установка в state данных из хранилища
    useEffect(() => {
        const task = taskServer.getTasks().find((tasks: Task) => tasks.id === id);
        if (typeof id === "undefined") {
            return setNewTask(initialNewTask);
        } else {
            return setNewTask(task)
        }
    }, [id]);

    // Установка в state данных из input
    const changeHandler = (fieldName: string) => (e: React.KeyboardEvent<HTMLInputElement>): void => {
        const id: string = Date.now().toString();
        setNewTask({...newTask, id, [fieldName]: e.currentTarget.value});
    }

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
    }

    const onPushStorage = () => {
        taskServer.saveTask(newTask);
        navigate(-1);
    }

    const onCancel = () => {
        navigate(-1);
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="formRow">
                <Label text="Наименование"/>
                <Input type="text" value={newTask.name} onChange={changeHandler('name')} name="name"/>
            </div>
            <div className="formRow">
                <Label text="Работа (в часах)"/>
                <Input type="text" value={newTask.executionTime} onChange={changeHandler('executionTime')}
                       name="description"/>
            </div>

            <div className="actionBar">
                <Button onClick={onPushStorage} text="Сохранить"/>
                <Button onClick={onCancel} text="Отмена"/>
            </div>

        </form>
    );
};

export default TaskForm;