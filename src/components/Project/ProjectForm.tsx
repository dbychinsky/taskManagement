import React, {useEffect, useState} from 'react';
import {Project} from "../../model/Project";
import {useNavigate, useParams} from "react-router-dom";
import Label from "../Label/Label";
import {server} from "../../App";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";

const ProjectForm = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const initialNewProject = {id: '', name: '', description: ''};
    const [newProject, setNewProjects] = useState<Project>(initialNewProject);

    // Установка в state данных из хранилища
    useEffect(() => {
        const project = server.getProjects().find((projects: Project) => projects.id === id);
        if (typeof id === "undefined") {
            return setNewProjects(initialNewProject);
        } else {
            return setNewProjects(project);
        }
    }, [id]);

    // Установка в state данных из input
    const changeHandler = (fieldName: string) => (e: React.KeyboardEvent<HTMLInputElement>): void => {
        const id: string = Date.now().toString();
        setNewProjects({...newProject, id, [fieldName]: e.currentTarget.value});
    }


    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
    }

    const onPushStorage = () => {
        server.saveProject(newProject);
        navigate(-1);
    }

    const onCancel = () => {
        navigate(-1);
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="formRow">
                <Label text="Имя проекта"/>
                <InputField type="text" value={newProject.name} onChange={changeHandler('name')} name="name"/>
            </div>
            <div className="formRow">
                <Label text="Описание проекта"/>
                <InputField type="text" value={newProject.description} onChange={changeHandler('description')}
                            name="description"/>
            </div>

            <div className="actionBar">
                <Button onClick={onPushStorage} text="Сохранить"/>
                <Button onClick={onCancel} text="Отмена"/>
            </div>

        </form>
    );
};

export default ProjectForm;