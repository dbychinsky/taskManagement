import React, {useEffect, useState} from 'react';
import {Project} from "../../model/Project";
import {useNavigate} from "react-router-dom";
import {PROJECT_FORM_PATH} from "../../routersProject";
import {server} from "../../app";
import Header from "../../components/header/Header";
import List, {ListData} from "../../components/list/List";
import Button from "../../components/button/Button";

const ProjectList = () => {
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

    const listData: ListData<Project>[] = [
        {
            label: "Наименование:",
            getValueList: (project) => project.name
        },
        {
            label: "Описание:",
            getValueList: (project) => project.description
        },
        {
            label: "",
            getValueList: (project) =>

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

export default ProjectList;
