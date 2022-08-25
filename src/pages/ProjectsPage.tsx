import React, {useEffect, useState} from 'react';
import {Project} from "../model/Project";
import {useNavigate} from "react-router-dom";
import {buildUpdateProjectPath, PROJECT_FORM} from "../Paths";
import Button from "../components/Button/Button";
import {ProjectList} from "../components/Project/ProjectList";
import {server} from "../App";


const ProjectsPage = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        setProjects(server.getProjects());
    }, []);


    const addProject = () => {
        navigate(PROJECT_FORM);
    }

    const deleteProject = (id: string) => {
        server.deleteProject(id);
        setProjects(server.getProjects());
    }

    const updateProject = (id: string) => {
        navigate(buildUpdateProjectPath(id!));
    }

    return (
        <div className="projectPage">

            <div className="actionBar">
                <Button onClick={addProject} text={"Добавить"}/>
            </div>

            <ProjectList project={projects} deleteProject={deleteProject} updateProject={updateProject}/>

        </div>
    );
};

export default ProjectsPage;
