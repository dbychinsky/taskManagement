import React, {ChangeEventHandler, useEffect, useState} from 'react';
import InputTextField from "../Fields/InputTextField/InputTextField";
import Button from "../Button/Button";
import {Project} from "../../model/Project";
import TaskView from "../Task/TaskView";
import {Task} from "../../model/Task";
import {Employee} from "../../model/Employee";
import Header from "../Header/Header";
import FormRow from "../Form/FormRow/FormRow";
import Form, {FieldListForm} from "../Form/Form";
import {
    isValidEmptyField,
    isValidEmptyFieldText, isValidLetterPositive, isValidLetterPositiveText,
    isValidNumberPositive,
    isValidNumberPositiveText
} from "../../Validate";
import {ErrorFieldState} from "../Employee/EmployeeForm";

interface IProjectFormProps {
    projectList: Project[],
    newProject: Project,
    taskList: Task[],
    employeeList: Employee[],
    onPushStorage: () => void,
    onCancel: () => void,
    changeHandlerForProject: (e: React.ChangeEvent<HTMLInputElement>) => void,
    submitHandler: (event: React.FormEvent) => void,
    updateTask: (id: string) => void,
    deleteTask: (id: string) => void,
    addTask: () => void
}

export const ProjectForm = (props: IProjectFormProps) => {
    const {
        projectList,
        taskList,
        employeeList,
        newProject,
        onPushStorage,
        onCancel,
        changeHandlerForProject,
        submitHandler,
        updateTask,
        deleteTask,
        addTask
    } = props

    const fieldList = [
        {
            label: "Наименование:",
            field: <InputTextField
                type="text"
                value={newProject.name}
                changeHandler={changeHandlerForProject}
                name="name"
                required={true}
                isValidLetterPositive={true}/>,
            message: ''
        },
        {
            label: "Описание:",
            field: <InputTextField
                type="text"
                value={newProject.description}
                changeHandler={changeHandlerForProject}
                name={"description"}
                required={true}
                isValidLetterPositive={true}/>,
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
    }, [newProject]);

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
                // Нуждается ли поле в проверке (обязательный аттрибут)
                if (fields.field.props.required) {
                    // Проверка на то, что поле заполнено
                    if (isValidEmptyField(fields.field.props.value)) {
                        fields.message = ''
                        changeFieldListErrors(fieldTemp.name, true);
                        // Проверка на положительные числа (кроме нуля)
                        if (fields.field.props.isValidNumberPositive) {
                            if (isValidNumberPositive(fields.field.props.value)) {
                                fields.message = ''
                                changeFieldListErrors(fieldTemp.name, true);
                            } else {
                                fields.message = isValidNumberPositiveText;
                                changeFieldListErrors(fieldTemp.name, false);
                            }
                        }
                        // Проверка на то, что в поле только буквы
                        if (fields.field.props.isValidLetterPositive) {
                            if (isValidLetterPositive(fields.field.props.value)) {
                                fields.message = ''
                                changeFieldListErrors(fieldTemp.name, true);
                            } else {
                                fields.message = isValidLetterPositiveText;
                                changeFieldListErrors(fieldTemp.name, false);
                            }
                        }
                    } else {
                        fields.message = isValidEmptyFieldText;
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
        <div className="projectForm">
            <Header title="Проект" isShowButton={false}/>
            <div className="content">
                <Form fieldListForm={fieldListForm}
                      onSubmitForm={onSubmitForm}
                      onCancel={onCancel}/>

                <div className="taskList">
                    <Button onClick={addTask} text="Добавить задачу"/>
                    <TaskView tasks={taskList}
                              employees={employeeList}
                              projects={projectList}
                              remove={deleteTask}
                              update={updateTask}/>
                </div>
            </div>
        </div>
    );
};
