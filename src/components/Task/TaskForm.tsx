import React, {useState} from 'react';
import {Task} from "../../model/Task";
import {TaskStatuses} from "../../model/TaskStatus";
import InputTextField from "../Fields/InputTextField/InputTextField";
import {Project} from "../../model/Project";
import {Employee} from "../../model/Employee";
import '../Fields/ComboboxField/Combobox.scss';
import ComboboxField from "../Fields/ComboboxField/ComboboxField";
import Header from "../Header/Header";
import Form from "../Form/Form";
import InputNumberField from "../Fields/InputNumberField/InputNumberField";
import {ConvertDate} from "../../util/convertDate";

export type FieldList = {
    label: string,
    field: JSX.Element
}

interface ITaskFormProps {
    task: Task,
    projectList: Project[],
    employeeList: Employee[],
    changeHandlerTask: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
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
        onPushStorage,
        onCancel
    } = props

    const fieldList = [
        {
            label: "Статус:",
            field: <ComboboxField
                changeHandler={changeHandlerTask}
                valueList={TaskStatuses}
                defaultValue={task.status}
                name="status"
            />
        },
        {
            label: "Наименование:",
            field: <InputTextField
                type="text"
                value={task.name}
                changeHandler={changeHandlerTask}
                name="name"
                required={true}
                isValidLetterPositive={true}
            />
        },
        {
            label: "Наименование проекта:",
            field: <ComboboxField
                changeHandler={changeHandlerTask}
                valueList={
                    projectList.map((project) => {
                        return {statusId: project.id, statusText: project.name}
                    })
                }
                defaultValue={task.projectId}
                name="projectId"
            />
        },
        {
            label: "Работа:",
            field: <InputNumberField
                type="text"
                value={task.executionTime}
                changeHandler={changeHandlerTask}
                name="executionTime"
                required={true}
                isValidNumberPositive={true}
            />
        },

        {
            label: "Дата начала:",
            field: <InputTextField
                type="text"
                value={ConvertDate.getStrFromDate(task.startDate)}
                changeHandler={changeHandlerTask}
                name="startDate"
            />
        },
        {
            label: "Дата окончания:",
            field: <InputTextField
                type="text"
                value={ConvertDate.getStrFromDate(task.endDate)}
                changeHandler={changeHandlerTask}
                name="endDate"
            />
        },
        {
            label: "Исполнитель:",
            field: <ComboboxField
                changeHandler={changeHandlerTask}
                valueList={
                    employeeList.map((employee) => {
                        return {statusId: employee.id, statusText: employee.fullName}
                    })
                }
                defaultValue={task.employeeId}
                name="employeeId"
            />
        }
    ];

    return (
        <div className="taskForm">
            <Header title="Задача" isShowButton={false}/>
            <div className="content">
                <Form fieldList={fieldList}
                      onPushStorage={onPushStorage}
                      onCancel={onCancel}/>
            </div>
        </div>
    );
};

export default TaskForm;