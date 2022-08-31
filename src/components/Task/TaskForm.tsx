import React, {ChangeEvent, ChangeEventHandler, useState} from 'react';
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
import Header from "../Header/Header";


export interface ITaskFormProps {
    task: Task,
    projectList: Project[],
    employeeList: Employee[],
    changeHandlerTask: (fieldName: string) => ChangeEventHandler,
    submitHandler: (event: React.FormEvent) => void,
    onPushStorage: () => void,
    onCancel: () => void,
}

const TaskForm = (props: ITaskFormProps) => {
    const {
        task,
        projectList,
        employeeList,
        changeHandlerTask,
        submitHandler,
        onPushStorage,
        onCancel
    } = props

    return (
        <div className="taskForm">
            <Header title="Задача" isShowButton={false}/>
            <div className="content">
                <form onSubmit={submitHandler}>
                    <div className="formRow">
                        <Label text="Статус"/>
                        <ComboboxField
                            changeHandler={changeHandlerTask("status")}
                            valueList={TASK_STATUSES}
                            defaultValue={task.status}
                        />
                    </div>

                    <div className="formRow">
                        <Label text="Наименование"/>
                        <InputTextField
                            type="text"
                            value={task.name}
                            onChange={changeHandlerTask('name')}
                            name="name"/>
                    </div>

                    <div className="formRow">
                        <Label text="Наименование проекта"/>
                        <ComboboxField
                            changeHandler={changeHandlerTask("projectId")}
                            valueList={
                                projectList.map((project) => {
                                    return {value: project.id, option: project.name}
                                })
                            }
                            defaultValue={task.projectId}
                        />
                    </div>

                    <div className="formRow">
                        <Label text="Работа (в часах)"/>
                        <InputTextField
                            type="text"
                            value={task.executionTime}
                            onChange={changeHandlerTask('executionTime')}
                            name="description"/>
                    </div>

                    <div className="formRow">
                        <Label text="Дата начала"/>
                        <InputTextField type="text" value={task.startDate}
                                        onChange={changeHandlerTask('startDate')}
                                        name="startDate"/>
                    </div>

                    <div className="formRow">
                        <Label text="Дата окончания"/>
                        <InputTextField type="text" value={task.endDate}
                                        onChange={changeHandlerTask('endDate')}
                                        name="endDate"/>
                    </div>

                    <div className="formRow">
                        <Label text="Исполнитель"/>

                        <ComboboxField
                            changeHandler={changeHandlerTask("employeeId")}
                            valueList={
                                employeeList.map((employee) => {
                                    return {value: employee.id, option: employee.fullName}
                                })
                            }
                            defaultValue={task.employeeId}
                        />

                    </div>

                    <div className="actionBar">
                        <Button onClick={onPushStorage} text="Сохранить"/>
                        <Button onClick={onCancel} text="Отмена"/>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default TaskForm;