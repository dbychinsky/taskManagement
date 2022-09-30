import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Task} from "../../model/Task";
import TaskListView from "./TaskListView";
import {Employee} from "../../model/Employee";
import {Project} from "../../model/Project";
import {server} from "../../app";
import Header from "../../components/header/Header";
import {TASK_FORM_PATH} from "../../routersProject";

/**
 * Страница со списком задач
 */
const TaskList = () => {
    const navigate = useNavigate();
    /**
     * Список задач
     */
    const [taskList, setTaskList] = useState<Task[]>([]);
    /**
     * Список сотрудников
     */
    const [employeeList, setEmployeeList] = useState<Employee[]>([]);
    /**
     * Список проектов
     */
    const [projectList, setProjectList] = useState<Project[]>([]);

    /**
     * Установка задач в состояние
     */
    useEffect(() => {
        setTaskList(server.getTasks());
    }, []);

    /**
     * Установка сотрудников в состояние
     */
    useEffect(() => {
        setEmployeeList(server.getEmployees());
    }, []);

    /**
     * Установка проектов в состояние
     */
    useEffect(() => {
        setProjectList(server.getProjects());
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
     * @param id идентификатор задачи
     */
    const remove = (id: string) => {
        server.deleteTask(id);
        setTaskList(server.getTasks());
    };

    /**
     * Метод для обновления задачи, вызываемый при нажатии кнопки "изменить",
     * переход к странице обновления/добавления
     * @param id идентификатор задачи
     */
    const update = (id: string) => {
        navigate(id);
    };

    return (
        <div className="taskPage">
            <Header title="Список задач"
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