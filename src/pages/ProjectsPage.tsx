import React, {useEffect, useState} from 'react';
import {Project} from "../model/Project";
import {useNavigate} from "react-router-dom";
import {buildUpdateProjectPath, PROJECT_FORM} from "../Paths";
import {ProjectList} from "../components/Project/ProjectList";
import {server} from "../App";
import Header from "../components/Header/Header";

const ProjectsPage = () => {
    const navigate = useNavigate();
    const [projectList, setProjectList] = useState<Project[]>([]);

    useEffect(() => {
        setProjectList(server.getProjects());
    }, []);

    const addProject = () => {
        navigate(PROJECT_FORM);
    }

    const deleteProject = (id: string) => {
        server.deleteProject(id);
        setProjectList(server.getProjects());
    }

    const updateProject = (id: string) => {
        navigate(buildUpdateProjectPath(id!));
    }

    return (
        <div className="projectPage">
            <Header
                title="Список проектов"
                onClick={addProject}
                text="Добавить"
                isShowButton={true}/>
            <ProjectList
                project={projectList}
                deleteProject={deleteProject}
                updateProject={updateProject}/>
        </div>
    );
};

export default ProjectsPage;
