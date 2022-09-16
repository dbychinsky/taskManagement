import React, {ChangeEventHandler, useEffect, useState} from 'react';
import InputTextField from "../../components/Fields/InputTextField/InputTextField";
import Button from "../../components/Button/Button";
import {Project} from "../../model/Project";
import TaskView from "../Task/TaskView";
import {Task} from "../../model/Task";
import {Employee} from "../../model/Employee";
import Header from "../../components/Header/Header";
import Form, {FormFeedback} from "../../components/Form/Form";
import {ErrorList} from "../../support/type";
import {validate} from "../../support/util/validate";

interface IProjectFormProps {
    projectList: Project[],
    newProject: Project,
    taskList: Task[],
    employeeList: Employee[],
    onPushStorage: () => void,
    onCancel: () => void,
    changeHandlerForProject: (e: React.ChangeEvent<HTMLInputElement>) => void,
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
        updateTask,
        deleteTask,
        addTask
    } = props

    const MAX_LENGTH: number = 50;

    const fieldList = [
        {
            label: "Наименование:",
            field: <InputTextField
                type="text"
                value={newProject.name}
                changeHandler={changeHandlerForProject}
                name="name"
                maxLength={MAX_LENGTH}
                required={true}
            />
        },
        {
            label: "Описание:",
            field: <InputTextField
                type="text"
                value={newProject.description}
                changeHandler={changeHandlerForProject}
                name={"description"}
                maxLength={MAX_LENGTH}
                required={true}
            />
        }
    ];

    // Формируем список ошибок на основе списка полей формы
    const [errorList, setErrorList] = useState<ErrorList[]>(
        fieldList.map(elem => {
            return {name: elem.field.props.name, isValid: true, errorMessage: ''}
        }));

    const [feedBackFormList, setFeedBackFormList] = useState<FormFeedback[]>([{
        isValid: true,
        errorMessage: ''
    }]);

    const onSubmitForm = () => {
        setErrorList(errorList => [...validate.validateField(fieldList, errorList)]);
        if (validate.isValidForm(errorList)) {
            onPushStorage();
        }
    }

    return (
        <div className="projectForm">
            <Header title="Проект" isShowButton={false}/>
            <div className="content">
                <Form fieldList={fieldList}
                      feedBackForm={feedBackFormList}
                      errorList={errorList}
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
