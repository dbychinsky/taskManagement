import React, {useEffect, useState} from 'react';
import {Employee} from "../../model/Employee";
import {useNavigate, useParams} from "react-router-dom";
import {server} from "../../app";
import {Task} from "../../model/Task";
import {Project} from "../../model/Project";
import TaskEditForm from "./TaskEditForm";

/**
 * Страница обновления/добавления задачи
 */
const TaskEdit = () => {

    const navigate = useNavigate();
    const {id} = useParams();

    /**
     * Получение и установка списка проектов к которым принадлежит задача
     */
    const [projectList, setProjectList] = useState<Project[]>([]);
    useEffect(() => {
        server.getProjects()
            .then(response => setProjectList(response))
            .catch(error => console.log(error))
    }, []);

    /**
     * Установка списка сотрудников к которым принадлежит задача
     */
    const [employeeList, setEmployeeList] = useState<Employee[]>([]);
    useEffect(() => {
        server.getEmployees()
            .then(response => setEmployeeList(response))
            .catch(error => console.log(error))
    }, []);

    /**
     * Установка задачи для обновления
     * Запрашиваем список задач, ищем по ID редактируемую.
     * Если есть, устанавливаем в состояние, если нет -
     * устанавливаем новую.
     */
    const [task, setTask] = useState<Task>();
    useEffect(() => {
        server.getTasks()
            .then(response => {
                const targetTask = response.find((tasks: Task) => tasks.id === id);
                if (!targetTask) {
                    setTask(new Task());
                } else {
                    setTask(targetTask);
                }
            })
            .catch(error => console.log(error))
    }, []);

    /**
     * Метод сохранения задачи
     *
     * @param {Task} task идентификатор задачи
     */
    const save = (task: Task) => {
        server.saveTask(task).then();
        server.getTasks().then(() => {
            navigate(-1)
        });
    };

    /**
     * Метод отмены
     */
    const cancel = () => {
        navigate(-1);
    };

    /**
     * Получаем необходимые данные и тогда рендерим форму
     */
    return task && employeeList && projectList ? <TaskEditForm
        task={task}
        employeeList={employeeList}
        projectList={projectList}
        onPushStorage={save}
        onCancel={cancel}
    /> : <></>
};

export default TaskEdit;