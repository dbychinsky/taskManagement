import React, {ChangeEventHandler, useEffect, useState} from 'react';
import InputTextField from "../Fields/InputTextField/InputTextField";
import Button from "../Button/Button";
import {Project} from "../../model/Project";
import TaskView from "../Task/TaskView";
import {Task} from "../../model/Task";
import {Employee} from "../../model/Employee";
import Header from "../Header/Header";
import Form from "../Form/Form";

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

    return (
        <div className="projectForm">
            <Header title="Проект" isShowButton={false}/>
            <div className="content">
                <Form fieldList={fieldList}
                      onPushStorage={onPushStorage}
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
