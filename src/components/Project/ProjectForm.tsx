import React, {useEffect, useState} from 'react';
import {Project} from "../../model/Project";
import {useNavigate, useParams} from "react-router-dom";
import Label from "../Label/Label";
import {server} from "../../App";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import {Task} from "../../model/Task";
import List, {ListLine} from "../List/List";
import './ProjectForm.scss';
import './../List/List.scss';
import Header from "../Header/Header";

const ProjectForm = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const initialNewProject = {id: '', name: '', description: ''};
    const [projectList, setProjectList] = useState<Project>(initialNewProject);
    const [taskList, setTaskList] = useState<Task[]>([]);

    // Установка в state данных из хранилища
    useEffect(() => {
        const project = server.getProjects().find((projects: Project) => projects.id === id);
        if (typeof id === "undefined") {
            return setProjectList(initialNewProject);
        } else {
            return setProjectList(project);
        }
    }, [id]);

    // useEffect(() => {
    //     setTasks(server.getTasks());
    // });

    // Установка в state данных из input
    const changeHandler = (fieldName: string) => (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (projectList.id !== '') {
            setProjectList({...projectList, [fieldName]: e.currentTarget.value});
        } else {
            const id: string = Date.now().toString();
            setProjectList({...projectList, id, [fieldName]: e.currentTarget.value});
        }
    };


    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
    };

    const onPushStorage = () => {
        server.saveProject(projectList);
        navigate(-1);
    };

    const onCancel = () => {
        navigate(-1);
    };

    const listData: ListLine<Task>[] = [
        {
            listName: "Наименование:",
            getValueListLine: (tasks) => tasks.name
        }
    ];

    return (
        <div className="projectForm">
            <Header
                title="Редактирование проекта"
                onClick={null}
                text={null}
                isShowButton={false}/>
            <section>
                <form onSubmit={submitHandler}>
                    <div className="formRow">
                        <Label text="Имя проекта"/>
                        <InputField type="text" value={projectList.name} onChange={changeHandler('name')} name="name"/>
                    </div>
                    <div className="formRow">
                        <Label text="Описание проекта"/>
                        <InputField type="text" value={projectList.description} onChange={changeHandler('description')}
                                    name="description"/>
                    </div>

                    <div className="actionBar">
                        <Button onClick={onPushStorage} text="Сохранить"/>
                        <Button onClick={onCancel} text="Отмена"/>
                    </div>

                </form>

                <div className="listTask">
                    <h2>Список задач</h2>
                    <List listData={listData} values={taskList}/>
                </div>
            </section>

        </div>
    );
};

export default ProjectForm;