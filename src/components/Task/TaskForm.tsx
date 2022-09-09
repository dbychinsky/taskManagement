import React, {useEffect, useState} from 'react';
import {Task} from "../../model/Task";
import {TaskStatuses} from "../../model/TaskStatus";
import Label from "../Label/Label";
import InputTextField from "../Fields/InputTextField/InputTextField";
import {Project} from "../../model/Project";
import {Employee} from "../../model/Employee";
import '../Fields/ComboboxField/Combobox.scss';
import ComboboxField from "../Fields/ComboboxField/ComboboxField";
import Header from "../Header/Header";
import Form, {FieldListForm} from "../Form/Form";
import {isValidEmptyField, isValidEmptyFieldText} from "../../Validate";
import Button from "../Button/Button";
import FormRow from "../Form/FormRow/FormRow";
import {ErrorFieldState} from "../Employee/EmployeeForm";

interface ITaskFormProps {
    task: Task,
    projectList: Project[],
    employeeList: Employee[],
    changeHandlerTask: (e: React.ChangeEvent<HTMLInputElement>) => void,
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
                changeHandler={changeHandlerTask}
                valueList={TaskStatuses}
                defaultValue={task.status}
            />,
            message: ''
        },
        {
            label: "Наименование:",
            field: <InputTextField
                type="text"
                value={task.name}
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
                defaultValue={task.projectId}/>,
            message: ''
        },
        {
            label: "Работа:",
            field: <InputTextField
                type="number"
                value={task.executionTime}
                changeHandler={changeHandlerTask}
                name="description"
                required={true}/>,
            message: ''
        },

        {
            label: "Дата начала:",
            field: <InputTextField
                type="text"
                value={task.startDate}
                changeHandler={changeHandlerTask}
                name="startDate"
            />,
            message: ''
        },
        {
            label: "Дата окончания:",
            field: <InputTextField
                type="text"
                value={task.endDate}
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
                defaultValue={task.employeeId}/>,
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
    }, [task]);

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

    const onSubmitForm = () => {
        validationField();
        if (isValidForm(fieldFieldStateError)) {
            onPushStorage();
        } else {
            console.log('form is not valid')
        }
    }

    return (
        <div className="taskForm">
            <Header title="Задача" isShowButton={false}/>
            <div className="content">
                <Form fieldListForm={fieldListForm}
                      onSubmitForm={onSubmitForm}
                      onCancel={onCancel}/>

            </div>
        </div>
    );
};

export default TaskForm;