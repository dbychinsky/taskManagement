import React from 'react';
import {Project} from "../../model/Project";
import List, {ListLine} from "../List/List";
import Button from "../Button/Button";

interface IProjectProps {
    project: Project[],
    deleteProject: (id: string) => void,
    updateProject: (id: string) => void
}

export const ProjectList = ({project, deleteProject, updateProject}: IProjectProps) => {
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
                    <Button onClick={() => updateProject(project.id)} text="Изменить"/>
                    <Button onClick={() => deleteProject(project.id)} text="Удалить"/>
                </div>

        }
    ]

    return <List listData={listData} values={project}/>
};
