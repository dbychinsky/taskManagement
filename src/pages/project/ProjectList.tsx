import React, {useEffect, useState} from 'react';
import {Project} from "../../model/Project";
import {useNavigate} from "react-router-dom";
import {PROJECT_FORM_PATH} from "../../routerList";
import {server} from "../../app";
import Header from "../../components/header/Header";
import List, {ListData} from "../../components/list/List";
import Button from "../../components/button/Button";
import {Task} from "../../model/Task";

/**
 * Страница со списком проектов
 */
const ProjectList = () => {

    const navigate = useNavigate();

    /**
     * Список проектов, получение и установка в состояние
     */
    const [projectList, setProjectList] = useState<Project[]>([]);
    const [taskList, setTaskList] = useState<Task[]>([]);

    useEffect(() => {
        getProjectList();
    }, [taskList])

    useEffect(() => {
        server.getTasks()
            .then((taskList) => setTaskList(taskList));
    }, [])

    /**
     * Метод для добавления проекта, вызываемый при нажатии кнопки "Добавить",
     * переход к странице обновления/добавления
     */
    const add = () => {
        navigate(PROJECT_FORM_PATH);
    };

    /**
     * Метод для удаления проекта, вызываемый при нажатии кнопки "удалить"
     * Удаляет проект и принадлежащие ему задачи
     *
     * @param id идентификатор проекта
     */
    const remove = (id: string) => {
        server.deleteProject(id).then()
            .then(() => getProjectList())
            .then(() => {
                taskList.forEach((task) => {
                    if (task.projectId === id) {
                        server.deleteTask(task.id).then();
                    }
                });
            })
    };

    /**
     * Метод для обновления проекта, вызываемый при нажатии кнопки "изменить",
     * переход к странице обновления/добавления
     *
     * @param id идентификатор проекта
     */
    const update = (id: string) => {
        navigate(id);
    };

    /**
     * Функция установки в состояние списка проектов
     */
    function getProjectList() {
        server.getProjects()
            .then(response => setProjectList(response))
            .catch(error => console.log(error))
    };

    /**
     * Список полей для отображения:
     *
     * name: имя поля
     * label: тестовое отображение имени поля
     * getValueList: метод получения данных для отображения в строке
     */
    const listData: ListData<Project>[] = [
        {
            name: "name",
            label: "Наименование:",
            getValueList: (project) => project.name
        },
        {
            name: "description",
            label: "Описание:",
            getValueList: (project) => project.description
        },
        {
            name: "actionBar",
            label: "",
            getValueList: (project) =>

                <div className="actionBar">
                    <Button onClick={() => update(project.id)} text="Изменить"/>
                    <Button onClick={() => remove(project.id)} text="Удалить"/>
                </div>
        }
    ];

    return (
        <div className="projectPage">
            <Header
                title="Список проектов"
                onClick={add}
                text="Добавить"
                isShowButton={true}/>

            <List listData={listData} values={projectList}/>
        </div>
    );
};

export default ProjectList;
