import React, {useEffect, useState} from 'react';
import {Project} from "../model/Project";
import {useNavigate} from "react-router-dom";
import {PROJECT_FORM} from "../RoutersProject";
import {ProjectList} from "../components/Project/ProjectList";
import {server} from "../App";
import Header from "../components/Header/Header";

const ProjectsPage = () => {
    const navigate = useNavigate();
    const [projectList, setProjectList] = useState<Project[]>([]);

    useEffect(() => {
        setProjectList(server.getProjects());
    }, []);

    const add = () => {
        navigate(PROJECT_FORM);
    };

    const remove = (id: string) => {
        server.deleteProject(id);
        setProjectList(server.getProjects());
    };

    const update = (id: string) => {
        navigate(id);
    };

    return (
        <div className="projectPage">
            <Header
                title="Список проектов"
                onClick={add}
                text="Добавить"
                isShowButton={true}/>

            <ProjectList
                project={projectList}
                remove={remove}
                update={update}/>
        </div>
    );
};

export default ProjectsPage;
