import React, {ChangeEventHandler, useEffect, useState} from 'react';
import {Task} from "../../model/Task";
import {TaskStatuses} from "../../model/TaskStatus";
import Label from "../Label/Label";
import InputTextField from "../Fields/InputTextField/InputTextField";
import Button from "../Button/Button";
import {Project} from "../../model/Project";
import {Employee} from "../../model/Employee";
import '../Fields/ComboboxField/Combobox.scss';
import ComboboxField from "../Fields/ComboboxField/ComboboxField";
import FormRow from "../Form/FormRow/FormRow";
import InputNumberField from "../Fields/InputNumberField/InputNumberField";
import {ConvertDate} from "../../util/convertDate";

interface ITaskFormProjectProps {
    taskForProject: Task,
    projectList: Project[],
    employeeList: Employee[],
    changeHandlerTask: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
    submitHandler: (event: React.FormEvent) => void,
    showPage: (value: boolean) => void,
    sendToStateTaskList: () => void
}

const TaskFromProject = (props: ITaskFormProjectProps) => {
    const {
        taskForProject,
        projectList,
        employeeList,
        changeHandlerTask,
        submitHandler,
        showPage,
        sendToStateTaskList
    } = props

    const fieldList = [
        {
            label: "Статус:",
            field: <ComboboxField
                changeHandler={changeHandlerTask}
                valueList={TaskStatuses}
                defaultValue={taskForProject.status}
                name={'status'}/>
        },
        {
            label: "Наименование:",
            field: <InputTextField
                type="text"
                value={taskForProject.name}
                changeHandler={changeHandlerTask}
                name="name"
                required={true}
                isValidLetterPositive={true}/>
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
                defaultValue={taskForProject.projectId}
                name="projectId"
                disabled={true}/>
        },
        {
            label: "Работа:",
            field: <InputNumberField
                type="text"
                value={taskForProject.executionTime}
                changeHandler={changeHandlerTask}
                name="executionTime"
                required={true}
                isValidNumberPositive={true}/>
        },

        {
            label: "Дата начала:",
            field: <InputTextField
                type="text"
                value={ConvertDate.getStrFromDate(taskForProject.startDate)}
                changeHandler={changeHandlerTask}
                name="startDate"
                required={false}
                isValidLetterPositive={true}/>
        },
        {
            label: "Дата окончания:",
            field: <InputTextField
                type="text"
                value={ConvertDate.getStrFromDate(taskForProject.endDate)}
                changeHandler={changeHandlerTask}
                name="endDate"
                required={false}
                isValidLetterPositive={true}/>
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
                defaultValue={taskForProject.employeeId}
                name="employeeId"/>
        }
    ];


    const onPushToState = (value: boolean) => {
        showPage(value);
        sendToStateTaskList();
    };

    const onCancel = (value: boolean) => {
        showPage(value);
    };


    return (
        <form onSubmit={submitHandler}>
            {
                fieldList.map(({label, field}, index) =>
                    <FormRow labelText={label} children={field} key={index}/>
                )
            }

            <div className="actionBar">
                <Button onClick={() => onPushToState(false)} text="Сохранить"/>
                <Button onClick={() => onCancel(false)} text="Отмена"/>
            </div>

        </form>

    );
};

export default TaskFromProject;