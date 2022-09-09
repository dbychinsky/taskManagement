import React from 'react';
import {Project} from "../../model/Project";
import List, {ListLine} from "../List/List";
import Button from "../Button/Button";

interface IProjectProps {
    project: Project[],
    remove: (id: string) => void,
    update: (id: string) => void
}

export const ProjectView = ({project, remove, update}: IProjectProps) => {
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
    ]

    return <List listData={listData} values={project}/>
};
