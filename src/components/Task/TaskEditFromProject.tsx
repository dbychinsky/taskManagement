import React, {ChangeEvent, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Task} from "../../model/Task";
import {TASK_STATUSES} from "../../model/TaskStatus";
import Label from "../Label/Label";
import InputTextField from "../InputTextField/InputTextField";
import Button from "../Button/Button";
import {server} from "../../App";
import {Project} from "../../model/Project";
import {Employee} from "../../model/Employee";
import './../ComboboxField/Combobox.scss';
import ComboboxField from "../ComboboxField/ComboboxField";
import taskList from "./TaskList";

const TaskEditFromProject = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const task = server.getTasks().find((tasks: Task) => tasks.id === id);
    const project = server.getProjects();
    const employee = server.getEmployees();
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
    const [tasksList, setTasksList] = useState<Task>(task ? task : initialNewTask);
    const [projectList, setProjectList] = useState<Project[]>(project);
    const [employeeList, setEmployeeList] = useState<Employee[]>(employee);

    // Установка в state данных из input
    const changeHandler = (fieldName: string) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        if (tasksList.id !== '') {
            setTasksList({...tasksList, [fieldName]: event.currentTarget.value});
        } else {
            const id: string = Date.now().toString();
            setTasksList({...tasksList, id, [fieldName]: event.currentTarget.value});
        }
    };

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
    };

    const onPushStorage = () => {
        console.log(tasksList);
        navigate(-1);
    };

    const onCancel = () => {
        navigate(-1);
    };

    return (
        <form onSubmit={submitHandler}>

            <div className="formRow">
                <Label text="Статус"/>
                <ComboboxField
                    changeHandler={changeHandler("status")}
                    valueList={TASK_STATUSES}
                    defaultValue={tasksList.status}
                />
            </div>

            <div className="formRow">
                <Label text="Наименование"/>
                <InputTextField
                    type="text"
                    value={tasksList.name}
                    onChange={changeHandler('name')}
                    name="name"/>
            </div>

            <div className="formRow">
                <Label text="Наименование проекта"/>
                <ComboboxField
                    changeHandler={changeHandler("projectId")}
                    valueList={
                        projectList.map((project) => {
                            return {value: project.id, option: project.name}
                        })
                    }
                    defaultValue={tasksList.projectId}
                    disabled={true}
                />
            </div>

            <div className="formRow">
                <Label text="Работа (в часах)"/>
                <InputTextField
                    type="text"
                    value={tasksList.executionTime}
                    onChange={changeHandler('executionTime')}
                    name="description"/>
            </div>

            <div className="formRow">
                <Label text="Дата начала"/>
                <InputTextField type="text" value={tasksList.startDate}
                                onChange={changeHandler('startDate')}
                                name="startDate"/>
            </div>

            <div className="formRow">
                <Label text="Дата окончания"/>
                <InputTextField type="text" value={tasksList.endDate}
                                onChange={changeHandler('endDate')}
                                name="endDate"/>
            </div>

            <div className="formRow">
                <Label text="Исполнитель"/>

                <ComboboxField
                    changeHandler={changeHandler("employeeId")}
                    valueList={
                        employeeList.map((employee) => {
                            return {value: employee.id, option: employee.fullName}
                        })
                    }
                    defaultValue={tasksList.employeeId}
                />

            </div>

            <div className="actionBar">
                <Button onClick={onPushStorage} text="Сохранить"/>
                <Button onClick={onCancel} text="Отмена"/>
            </div>

        </form>
    );
};

export default TaskEditFromProject;