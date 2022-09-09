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
import Form, {FieldListForm} from "../Form/Form";
import {isValidEmptyField, isValidEmptyFieldText} from "../../Validate";
import {ErrorFieldState} from "../Employee/EmployeeForm";

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

    const fieldList = [
        {
            label: "Статус:",
            field: <ComboboxField
                changeHandler={changeHandlerTask}
                valueList={TaskStatuses}
                defaultValue={taskForProject.status}/>,
            message: ''
        },
        {
            label: "Наименование:",
            field: <InputTextField
                type="text"
                value={taskForProject.name}
                changeHandler={changeHandlerTask}
                name="name"
                required={true}/>,
            message: ''
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
                disabled={true}/>,
            message: ''
        },
        {
            label: "Работа:",
            field: <InputTextField
                type="text"
                value={taskForProject.executionTime}
                changeHandler={changeHandlerTask}
                name="description"
                required={true}/>,
            message: ''
        },

        {
            label: "Дата начала:",
            field: <InputTextField
                type="text"
                value={taskForProject.startDate}
                changeHandler={changeHandlerTask}
                name="startDate"/>,
            message: ''
        },
        {
            label: "Дата окончания:",
            field: <InputTextField
                type="text"
                value={taskForProject.endDate}
                changeHandler={changeHandlerTask}
                name="endDate"/>,
            message: ''
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
                defaultValue={taskForProject.employeeId}/>,
            message: ''
        }
    ];

    const fieldFieldStateError =
        [
            {name: "name", isValid: false},
            {name: "description", isValid: false}
        ];

    const [fieldListForm, setFieldListForm] = useState<FieldListForm[]>(fieldList);

    useEffect(() => {
        setFieldListForm(fieldList);
    }, [taskForProject]);

    const validationField = () => {

        const changeFieldListErrors = (name: string, isValid: boolean) => {
            fieldFieldStateError.forEach((element) => {
                if (element.name === name) {
                    element.isValid = isValid;
                }
            });
        }

        setFieldListForm(fieldList.map((fields) => {

                let fieldTemp = fields.field.props;

                if (fields.field.props.required) {
                    if (isValidEmptyField(fields.field.props.value)) {
                        fields.message = ''
                        console.log('Поле валидно.', fields.message);
                        changeFieldListErrors(fieldTemp.name, true);


                    } else {
                        fields.message = isValidEmptyFieldText;
                        console.log('Поле не валидно.', fields.message);
                        changeFieldListErrors(fieldTemp.name, false);

                    }
                }
                return fields
            }
        ))
    };

    const isValidForm = (fieldFieldStateError: ErrorFieldState[]): boolean => {
        return typeof (fieldFieldStateError.find(element => element.isValid == false)) == 'undefined'
    }

    const onPushToState = (value: boolean) => {
        validationField();
        if (isValidForm(fieldFieldStateError)) {
            showPage(value);
            sendToStateTaskList();
        } else {
            console.log('form is not valid')
        }
    };

    const onCancel = (value: boolean) => {
        showPage(value);
    };


    return (
        <form onSubmit={submitHandler}>
            {
                fieldListForm.map(({label, field, message}, index) =>
                    <FormRow labelText={label} children={field} message={message} key={index}/>
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