import React from 'react';
import {Task} from "../../model/Task";
import List, {ListLine} from "../List/List";
import {Employee} from "../../model/Employee";
import Button from "../Button/Button";
import {Project} from "../../model/Project";

export interface ITaskProps {
    tasks: Task[],
    employees: Employee[],
    projects: Project[],
    deleteTask: (id: string) => void,
    updateTask: (id: string) => void
}

const TaskList = ({tasks, projects, employees, deleteTask, updateTask}: ITaskProps) => {
    const listData: ListLine<Task>[] = [
        {
            listName: "Статус:",
            // getValueListLine: (tasks) => tasks.status && TaskStatusToString[tasks.status]
            getValueListLine: (tasks) => tasks.status
        },
        {
            listName: "Наименование:",
            getValueListLine: (tasks) => tasks.name
        },
        {
            listName: "Наименование проекта",
            getValueListLine: (tasks) => projects.find(project => project.id === tasks.projectId)?.name || "Проект не выбран"
        },
        {
            listName: "Работа",
            getValueListLine: (tasks) => tasks.executionTime
        },
        {
            listName: "Дата начала",
            getValueListLine: (tasks) => tasks.startDate
        },
        {
            listName: "Дата окончания",
            getValueListLine: (tasks) => tasks.endDate
        },
        {
            listName: "Исполнитель:",
            getValueListLine: (tasks) => employees.find(employees => employees.id === tasks.employeeId)?.fullName || "Исполнитель не назначен"
        },
        {
            listName: "",
            getValueListLine: (tasks) =>
                <div className="actionBar">
                    <Button onClick={() => updateTask(tasks.id)} text="Изменить"/>
                    <Button onClick={() => deleteTask(tasks.id)} text="Удалить"/>
                </div>
        }
    ]
    return <List listData={listData} values={tasks}/>
};

export default TaskList;