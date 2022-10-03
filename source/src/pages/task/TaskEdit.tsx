import React, {ChangeEvent, useState} from 'react';
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
     * Получение списков сотрудников, проектов для начальной
     * инициализации
     */
    const initialProjectList = server.getProjects();
    const initialEmployeeList = server.getEmployees();


    /**
     * Установка задачи для обновления
     */
    const [task, setTasks] = useState(requestTask(id));
    /**
     * Установка списка проектов к которым принадлежит задача
     */
    const [projectList, setProjectList] = useState<Project[]>(initialProjectList);
    /**
     * Установка списка сотрудников к которым принадлежит задача
     */
    const [employeeList, setEmployeeList] = useState<Employee[]>(initialEmployeeList);

    /**
     * Метод получения задачи по id, если идентификтор отсутствует -
     * создаем новую
     *
     * @param id идентификатор задачи
     */
    function requestTask(id: string): Task {
        const target = server.getTasks().find((tasks: Task) => tasks.id === id);
        if (target) {
            return target
        } else return new Task();
    }

    /**
     * Метод сохранения задачи
     *
     * @param id идентификатор задачи
     */
    const save = (task: Task) => {
        server.saveTask(task);
        navigate(-1);
    };

    /**
     * Метод отмены
     */
    const cancel = () => {
        navigate(-1);
    };

    return <TaskEditForm
        task={task}
        employeeList={employeeList}
        projectList={projectList}
        onPushStorage={save}
        onCancel={cancel}
    />
};

export default TaskEdit;