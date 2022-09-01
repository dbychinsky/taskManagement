import React, {ChangeEventHandler} from 'react';
import {Task} from "../../model/Task";
import {TASK_STATUSES} from "../../model/TaskStatus";
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
    changeHandlerTask: (fieldName: string) => ChangeEventHandler,
    submitHandler: (event: React.FormEvent) => void,
    showPage: (value: boolean) => void,
    sendToStateTaskList: () => void
}

const TaskFormProject = (props: ITaskFormProjectProps) => {

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
                changeHandler={changeHandlerTask("status")}
                valueList={TASK_STATUSES}
                defaultValue={taskForProject.status}/>
        },
        {
            label: "Наименование:",
            field: <InputTextField
                type="text"
                value={taskForProject.name}
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
                defaultValue={taskForProject.projectId}
                disabled={true}/>
        },
        {
            label: "Работа:",
            field: <InputTextField
                type="text"
                value={taskForProject.executionTime}
                onChange={changeHandlerTask('executionTime')}
                name="description"/>
        },

        {
            label: "Дата начала:",
            field: <InputTextField
                type="text"
                value={taskForProject.startDate}
                onChange={changeHandlerTask('startDate')}
                name="startDate"/>
        },
        {
            label: "Дата окончания:",
            field: <InputTextField
                type="text"
                value={taskForProject.endDate}
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

export default TaskFormProject;