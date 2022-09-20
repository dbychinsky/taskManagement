import React from 'react';
import {Task} from "../../model/Task";
import List, {ListData} from "../../components/list/List";
import {Employee} from "../../model/Employee";
import Button from "../../components/button/Button";
import {Project} from "../../model/Project";
import {getTaskStatusToString} from "../../support/util/taskStatusConvertToStr";
import {ConvertDate} from "../../support/util/convertDate";

export interface ITaskProps {
    taskList: Task[],
    employees: Employee[],
    projects: Project[],
    remove: (id: string) => void,
    update: (id: string) => void
}

const TaskListView = ({taskList, projects, employees, remove, update}: ITaskProps) => {
    const listData: ListData<Task>[] = [
        {
            name: "status",
            label: "Статус:",
            getValueList: (task) => getTaskStatusToString(task.status)
        },
        {
            name: "name",
            label: "Наименование:",
            getValueList: (task) => task.name
        },
        {
            name: "project",
            label: "Наименование проекта:",
            getValueList: (task) => projects.find(project => project.id === task.projectId)?.name || "Проект не выбран"
        },
        {
            name: "executionTime",
            label: "Работа:",
            getValueList: (task) => task.executionTime
        },
        {
            name: "startDate",
            label: "Дата начала:",
            getValueList: (task) => ConvertDate.getStrFromDate(task.startDate)
        },
        {
            name: "endDate",
            label: "Дата окончания:",
            getValueList: (task) => ConvertDate.getStrFromDate(task.endDate)
        },
        {
            name: "employee",
            label: "Исполнитель:",
            getValueList: (task) => employees.find(employees => employees.id === task.employeeId)?.fullName || "Исполнитель не назначен"
        },
        {
            name: "actionBar",
            label: "",
            getValueList: (task) =>
                <div className="actionBar">
                    <Button onClick={() => update(task.id)} text="Изменить"/>
                    <Button onClick={() => remove(task.id)} text="Удалить"/>
                </div>
        }
    ]
    return <List listData={listData} values={taskList}/>
};

export default TaskListView;