import React from 'react';
import {Task} from "../../model/Task";
import List, {ListData} from "../../components/list/List";
import {Employee} from "../../model/Employee";
import Button from "../../components/button/Button";
import {Project} from "../../model/Project";
import {getTaskStatusToString} from "../../support/util/taskStatusConvertToStr";
import {ConvertDate} from "../../support/util/convertDate";

/**
 * Страница со списком задач, является общей для страниц
 * задач и проектов(используется при отображении списка задач
 * из страницы проектов).
 */

type ITaskProps = {
    /**
     * Список задач
     */
    taskList: Task[],

    /**
     * Список сотрудников
     */
    employeeList: Employee[],

    /**
     * Список проектов
     */
    projectList: Project[],

    /**
     * Метод удаления
     *
     * @param id идентификатор задачи
     *
     */
    remove: (id: string) => void,

    /**
     * Метод обновления
     *
     * @param id идентификатор задачи
     */
    update: (id: string) => void
}

const TaskListView = ({taskList, projectList, employeeList, remove, update}: ITaskProps) => {
    /**
     * Список полей для отображения:
     * name: имя поля
     * label: тестовое отображение имени поля
     * getValueList: метод получения данных для отображения в строке
     */
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
            getValueList: (task) => projectList.find(project => project.id === task.projectId)?.name || "Проект не выбран"
        },
        {
            name: "executionTime",
            label: "Работа:",
            getValueList: (task) => task.executionTime
        },
        {
            name: "startDate",
            label: "Дата начала:",
            // getValueList: (task) => ConvertDate.getStrFromDate(task.startDate)
            getValueList: (task) => ConvertDate.getLocaleDateStr(ConvertDate.getStrFromDate(task.startDate))
        },
        {
            name: "endDate",
            label: "Дата окончания:",
            getValueList: (task) => ConvertDate.getLocaleDateStr(ConvertDate.getStrFromDate(task.endDate))
        },
        {
            name: "employee",
            label: "Исполнитель:",
            getValueList: (task) => employeeList.find(employees => employees.id === task.employeeId)?.fullName || "Исполнитель не назначен"
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