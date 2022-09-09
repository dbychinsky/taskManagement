import React, {ChangeEvent, useState} from 'react';
import {Project} from "../../model/Project";
import {useNavigate, useParams} from "react-router-dom";
import {server} from "../../App";
import {Task} from "../../model/Task";
import './ProjectForm.scss';
import './../List/List.scss';
import TaskFromProject from "../Task/TaskFromProject";
import {ProjectForm} from './ProjectForm';
import {TaskStatus} from "../../util/convertToStrTaskStatus";

const ProjectService = () => {

    const navigate = useNavigate();
    const {id} = useParams();

    const initialEmployeeList = server.getEmployees();
    const initialProjectList = server.getProjects();
    const initialTaskList = server.getTasks();

    const initialNewProject = {id: '', name: '', description: ''};
    const initialNewTask = {
        id: '',
        status: TaskStatus.NotStarted,
        name: '',
        executionTime: 0,
        startDate: '',
        endDate: '',
        projectId: id,
        employeeId: ''
    };

    const [isTaskEditForm, setTaskEditForm] = useState<boolean>(false);

    // Устанавливаем проект для редактирования, если в URL нет id - инициализируем пустым
    const project: Project = initialProjectList.find((projects: Project) => projects.id === id);
    const [newProject, setNewProject] = useState<Project>(project ? project : initialNewProject);

    // Устанавливаем таски принадлежащие проекту, если в URL нет id - инициализируем пустым
    const taskListProject: Task[] = initialTaskList.filter((taskListProject) => taskListProject.projectId === newProject.id);
    const [taskList, setTaskList] = useState<Task[]>(taskListProject ? taskListProject : [initialNewTask]);

    //Устанавливаем таску для редактирования, в нее попадают данные из формы
    const [taskForProject, setTaskForProject] = useState<Task>();

    // Список проектов инициализируем данными с сервера
    const [projectList, setProjectList] = useState(initialProjectList);

    // Список сотрудников инициализируем данными с сервера
    const [employeeList, setEmployeeList] = useState(initialEmployeeList);

    //Список удаленных тасок. Временное хранилище перед отправкой на сервер
    const [deleteTaskList, setDeleteTaskList] = useState([]);

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
    };

    // Установка в состояние данных из полей формы страницы Project
    const changeHandlerForProject = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (newProject.id !== '') {
            setNewProject({...newProject, [e.currentTarget.name]: e.currentTarget.value});
        } else {
            const id: string = Date.now().toString();
            setNewProject({...newProject, id, [e.currentTarget.name]: e.currentTarget.value});
        }
    };

    // Установка в состояние данных из полей формы страницы Task
    const changeHandlerForTask =  (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        if (taskForProject.id !== '') {
            setTaskForProject({...taskForProject, [e.currentTarget.name]: e.currentTarget.value});
        } else {
            const id: string = Date.now().toString();
            setTaskForProject({...taskForProject, id, [e.currentTarget.name]: e.currentTarget.value});
        }
    };

    // Добавление данных в состояние тасок, после редактирования
    const sendToStateTaskList = () => {
        const targetIndex = taskList.findIndex((el) => el.id === taskForProject.id);
        if (targetIndex + 1) {
            taskList.splice(targetIndex, 1, taskForProject);
        } else
            taskList.push(taskForProject);
    }

    // Отмена
    const onCancel = () => {
        navigate(-1);
    };

    // Удаление из списка тасок на форме проекта
    const deleteTask = (id: string) => {
        // Добавляем элемент в массив "Удаленные элементы"
        const remoteTask = taskList.find((task: Task) => task.id === id);
        setDeleteTaskList([...deleteTaskList, remoteTask]);
        // Удаляем из списка задач элемент для отображения на экране 
        const taskListNew = taskList.filter((task: Task) => task.id !== remoteTask.id);
        setTaskList([...taskListNew])
    };

    // Переходим на страницу редактирования таски
    const updateTask = (id: string) => {
        const task = taskList.find((tasks: Task) => tasks.id === id);
        setTaskForProject(task);
        setTaskEditForm(true);
    };

    // Создание таски из страницы редактирования проекты
    const addTask = () => {
        setTaskForProject(initialNewTask);
        setTaskEditForm(true);
    }

    // Метод для работы с условным рендером
    const showPage = (value: boolean) => {
        setTaskEditForm(value);
    }

    // Отправка данных на сервер
    const onPushStorage = () => {
        server.saveProject(newProject);
        addIdToTask(newProject.id);
        deleteTaskList.forEach(function (task) {
            server.deleteTask(task.id);
        });
        taskList.forEach(function (task) {
            server.saveTask(task);
        });
        navigate(-1);
    };

    // Добавление к таскам идентификатора проекта
    const addIdToTask = (newProjectId: string) => {
        taskList.forEach((task) => {
            task.projectId = newProjectId
        });
    }

    const projectFormEdit =
        <ProjectForm
            projectList={projectList}
            newProject={newProject}
            onPushStorage={onPushStorage}
            onCancel={onCancel}
            changeHandlerForProject={changeHandlerForProject}
            submitHandler={submitHandler}
            taskList={taskList}
            employeeList={employeeList}
            deleteTask={deleteTask}
            updateTask={updateTask}
            addTask={addTask}
        />

    const taskEditFromProject =
        <TaskFromProject
            taskForProject={taskForProject}
            projectList={projectList}
            employeeList={employeeList}
            submitHandler={submitHandler}
            changeHandlerTask={changeHandlerForTask}
            showPage={showPage}
            sendToStateTaskList={sendToStateTaskList}
        />
    return (
        <>
            {isTaskEditForm ? taskEditFromProject : projectFormEdit}
        </>
    );
};

export default ProjectService;