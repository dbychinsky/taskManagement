import React, {useEffect, useState} from 'react';
import {Project} from "../../model/Project";
import {useNavigate} from "react-router-dom";
import {PROJECT_FORM_PATH} from "../../RoutersProject";
import {server} from "../../App";
import Header from "../../components/Header/Header";
import List, {ListLine} from "../../components/List/List";
import Button from "../../components/Button/Button";

const ProjectsList = () => {
    const navigate = useNavigate();
    const [projectList, setProjectList] = useState<Project[]>([]);

    useEffect(() => {
        setProjectList(server.getProjects());
    }, []);

    const add = () => {
        navigate(PROJECT_FORM_PATH);
    };

    const remove = (id: string) => {
        server.deleteProject(id);
        setProjectList(server.getProjects());
    };

    const update = (id: string) => {
        navigate(id);
    };

    const listData: ListLine<Project>[] = [
        {
            listName: "Наименование:",
            getValueListLine: (project) => project.name
        },
        {
            listName: "Описание:",
            getValueListLine: (project) => project.description
        },
        {
            listName: "",
            getValueListLine: (project) =>

                <div className="actionBar">
                    <Button onClick={() => update(project.id)} text="Изменить"/>
                    <Button onClick={() => remove(project.id)} text="Удалить"/>
                </div>
        }
    ];

    return (
        <div className="projectPage">
            <Header
                title="Список проектов"
                onClick={add}
                text="Добавить"
                isShowButton={true}/>

            <List listData={listData} values={projectList}/>
        </div>
    );
};

export default ProjectsList;
