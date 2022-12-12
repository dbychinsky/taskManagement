import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Task} from "../../model/Task";
import TaskListView from "./TaskListView";
import {Employee} from "../../model/Employee";
import {Project} from "../../model/Project";
import {server} from "../../app";
import Header from "../../components/header/Header";
import {TASK_FORM_PATH} from "../../routerList";
import "./TaskList.scss";

/**
 * Страница со списком задач
 */
const TaskList = () => {

    const navigate = useNavigate();

    /**
     * Список задач
     */
    const [taskList, setTaskList] = useState<Task[]>([]);
    useEffect(() => {
        getTaskList();
    }, []);

    /**
     * Список сотрудников
     */
    const [employeeList, setEmployeeList] = useState<Employee[]>([]);
    useEffect(() => {
        server.getEmployees()
            .then(response => setEmployeeList(response))
            .catch(error => console.log(error))
    }, []);

    /**
     * Список проектов
     */
    const [projectList, setProjectList] = useState<Project[]>([]);
    useEffect(() => {
        server.getProjects()
            .then(response => setProjectList(response))
            .catch(error => console.log(error))
    }, []);

    /**
     * Метод для добавления задачи, вызываемый при нажатии кнопки "Добавить",
     * переход к странице обновления/добавления
     */
    const add = () => {
        navigate(TASK_FORM_PATH);
    };

    /**
     * Метод для удаления задачи, вызываемый при нажатии кнопки "удалить"
     *
     * @param {string} id идентификатор задачи
     */
    const remove = (id: string) => {
        server.deleteTask(id)
            .then(() => getTaskList())
            .catch(error => console.log(error))
    };

    /**
     * Метод для обновления задачи, вызываемый при нажатии кнопки "изменить",
     * переход к странице обновления/добавления
     *
     * @param {string} id идентификатор задачи
     */
    const update = (id: string) => {
        navigate(id);
    };

    /**
     * Функция установки в состояние списка задач
     */
    function getTaskList() {
        server.getTasks()
            .then(response => setTaskList(response))
            .catch(error => console.log(error))
    };

    return (
        <div className="taskPage">
            <Header title="Список задач проекта"
                    onClick={add}
                    text="Добавить"
                    isShowButton={true}/>
            <TaskListView
                taskList={taskList}
                employeeList={employeeList}
                projectList={projectList}
                remove={remove}
                update={update}/>
        </div>
    );
};

export default TaskList;