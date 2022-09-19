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
            label: "Статус:",
            getValueList: (task) => getTaskStatusToString(task.status)
        },
        {
            label: "Наименование:",
            getValueList: (task) => task.name
        },
        {
            label: "Наименование проекта:",
            getValueList: (task) => projects.find(project => project.id === task.projectId)?.name || "Проект не выбран"
        },
        {
            label: "Работа:",
            getValueList: (task) => task.executionTime
        },
        {
            label: "Дата начала:",
            getValueList: (task) => ConvertDate.getStrFromDate(task.startDate)
        },
        {
            label: "Дата окончания:",
            getValueList: (task) => ConvertDate.getStrFromDate(task.endDate)
        },
        {
            label: "Исполнитель:",
            getValueList: (task) => employees.find(employees => employees.id === task.employeeId)?.fullName || "Исполнитель не назначен"
        },
        {
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