import React from 'react';
import {Task} from "../../model/Task";
import List, {ListLine} from "../List/List";
import {Employee} from "../../model/Employee";
import Button from "../Button/Button";
import {TaskStatusToString} from "../../model/TaskStatus";
import {Project} from "../../model/Project";

interface ITaskProps {
    task: Task[],
    employees: Employee[],
    projects: Project[],
    deleteTask: (id: string) => void,
    updateTask: (id: string) => void
}


const TaskList = ({task, projects, employees, deleteTask, updateTask}: ITaskProps) => {
    const listData: ListLine<Task>[] = [
        {
            listName: "Статус:",
            getValueListLine: (task) => task.status && TaskStatusToString[task.status]
        },
        {
            listName: "Наименование:",
            getValueListLine: (task) => task.name
        },
        {
            listName: "Наименование проекта",
            getValueListLine: (task) => projects.find(project => project.id === task.projectId)?.name || "Проект не выбран"
        },
        {
            listName: "Работа",
            getValueListLine: (task) => task.executionTime
        },
        {
            listName: "Дата начала",
            getValueListLine: (task) => task.startDate
        },
        {
            listName: "Дата окончания",
            getValueListLine: (task) => task.endDate
        },
        {
            listName: "Исполнитель:",
            getValueListLine: (task) => employees.find(employee => employee.id === task.employeeId)?.fullName || "Исполнитель не назначен"
        },
        {
            listName: "",
            getValueListLine: (task) =>
                <div className="actionBar">
                    <Button onClick={() => updateTask(task.id)} text="Изменить"/>
                    <Button onClick={() => deleteTask(task.id)} text="Удалить"/>
                </div>
        }
    ]
    return <List listData={listData} values={task}/>
};

export default TaskList;