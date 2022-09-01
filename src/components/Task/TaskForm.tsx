import React, {ChangeEvent, ChangeEventHandler, ReactNode, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Task} from "../../model/Task";
import {TASK_STATUSES} from "../../model/TaskStatus";
import Label from "../Label/Label";
import InputTextField from "../Fields/InputTextField/InputTextField";
import Button from "../Button/Button";
import {server} from "../../App";
import {Project} from "../../model/Project";
import {Employee} from "../../model/Employee";
import '../Fields/ComboboxField/Combobox.scss';
import ComboboxField from "../Fields/ComboboxField/ComboboxField";
import Header from "../Header/Header";
import FormRow from "../Form/FormRow/FormRow";

interface ITaskFormProps {
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

    const fieldList = [
        {
            label: "Статус:",
            field: <ComboboxField
                changeHandler={changeHandlerTask("status")}
                valueList={TASK_STATUSES}
                defaultValue={task.status}/>
        },
        {
            label: "Наименование:",
            field: <InputTextField
                type="text"
                value={task.name}
                onChange={changeHandlerTask('name')}
                name="name"/>
        },
        {
            label: "Наименование проекта:",
            field: <ComboboxField
                changeHandler={changeHandlerTask("projectId")}
                valueList={
                    projectList.map((project) => {
                        return {value: project.id, option: project.name}
                    })
                }
                defaultValue={task.projectId}/>
        },
        {
            label: "Работа:",
            field: <InputTextField
                type="number"
                value={task.executionTime}
                onChange={changeHandlerTask('executionTime')}
                name="description"/>
        },

        {
            label: "Дата начала:",
            field: <InputTextField
                type="text"
                value={task.startDate}
                onChange={changeHandlerTask('startDate')}
                name="startDate"/>
        },
        {
            label: "Дата окончания:",
            field: <InputTextField
                type="text"
                value={task.endDate}
                onChange={changeHandlerTask('endDate')}
                name="endDate"/>
        },
        {
            label: "Исполнитель:",
            field: <ComboboxField
                changeHandler={changeHandlerTask("employeeId")}
                valueList={
                    employeeList.map((employee) => {
                        return {value: employee.id, option: employee.fullName}
                    })
                }
                defaultValue={task.employeeId}/>
        }
    ]

    return (
        <div className="taskForm">
            <Header title="Задача" isShowButton={false}/>
            <div className="content">
                <form onSubmit={submitHandler}>
                    {
                        fieldList.map(({label, field}, index) =>
                            <FormRow labelText={label} children={field} key={index}/>
                        )
                    }
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