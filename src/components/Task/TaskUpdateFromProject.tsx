import React, {ChangeEventHandler} from 'react';
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

interface ITaskFormProjectProps {
    taskForProject: Task,
    projectList: Project[],
    employeeList: Employee[],
    changeHandlerTask: (e: React.ChangeEvent<HTMLInputElement>) => void,
    submitHandler: (event: React.FormEvent) => void,
    showPage: (value: boolean) => void,
    sendToStateTaskList: () => void
}

const TaskUpdateFromProject = (props: ITaskFormProjectProps) => {
    const {
        taskForProject,
        projectList,
        employeeList,
        changeHandlerTask,
        submitHandler,
        showPage,
        sendToStateTaskList
    } = props

    const onPushToState = (value: boolean) => {
        showPage(value);
        sendToStateTaskList();
    };

    const onCancel = (value: boolean) => {
        showPage(value);
    };

    const fieldList = [
        {
            label: "Статус:",
            field: <ComboboxField
                changeHandler={changeHandlerTask}
                valueList={TaskStatuses}
                defaultValue={taskForProject.status}/>
        },
        {
            label: "Наименование:",
            field: <InputTextField
                type="text"
                value={taskForProject.name}
                changeHandler={changeHandlerTask}
                name="name"/>
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
                disabled={true}/>
        },
        {
            label: "Работа:",
            field: <InputTextField
                type="text"
                value={taskForProject.executionTime}
                changeHandler={changeHandlerTask}
                name="description"/>
        },

        {
            label: "Дата начала:",
            field: <InputTextField
                type="text"
                value={taskForProject.startDate}
                changeHandler={changeHandlerTask}
                name="startDate"/>
        },
        {
            label: "Дата окончания:",
            field: <InputTextField
                type="text"
                value={taskForProject.endDate}
                changeHandler={changeHandlerTask}
                name="endDate"/>
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
                defaultValue={taskForProject.employeeId}/>
        }
    ]

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

export default TaskUpdateFromProject;