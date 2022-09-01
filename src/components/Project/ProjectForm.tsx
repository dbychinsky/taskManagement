import React, {ChangeEventHandler} from 'react';
import InputTextField from "../Fields/InputTextField/InputTextField";
import Button from "../Button/Button";
import {Project} from "../../model/Project";
import TaskList from "../Task/TaskList";
import {Task} from "../../model/Task";
import {Employee} from "../../model/Employee";
import Header from "../Header/Header";
import FormRow from "../Form/FormRow/FormRow";

interface IProjectFormProps {
    projectList: Project[],
    newProject: Project,
    taskList: Task[],
    employeeList: Employee[],
    onPushStorage: () => void,
    onCancel: () => void,
    changeHandler: (fieldName: string) => ChangeEventHandler,
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
        changeHandler,
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
                onChange={changeHandler("name")}
                name={"name"}/>
        },
        {
            label: "Описание:",
            field: <InputTextField
                type="text"
                value={newProject.description}
                onChange={changeHandler("description")}
                name={"description"}/>
        }
    ];

    return (
        <div className="projectForm">
            <Header title="Проект" isShowButton={false}/>
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

                <div className="taskList">

                    <Button onClick={addTask} text="Добавить задачу"/>

                    <TaskList tasks={taskList}
                              employees={employeeList}
                              projects={projectList}
                              remove={deleteTask}
                              update={updateTask}/>
                </div>
            </div>
        </div>

    );
};
