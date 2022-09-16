import React, {useState} from 'react';
import {Project} from "../../model/Project";
import {useNavigate, useParams} from "react-router-dom";
import {server} from "../../App";
import {Task} from "../../model/Task";
import './ProjectForm.scss';
import '../../components/List/List.scss';
import {ProjectForm} from './ProjectForm';
import TaskForm from "../Task/TaskForm";

const ProjectService = () => {

    const navigate = useNavigate();
    const {id} = useParams();

    const initialEmployeeList = server.getEmployees();
    const initialProjectList = server.getProjects();
    const initialTaskList = server.getTasks();

    // Состояние редактирования таски
    const [isTaskEditForm, setTaskEditForm] = useState<boolean>(false);

    // Устанавливаем проект для редактирования, если в URL нет id - инициализируем пустым
    const project: Project = initialProjectList.find((projects: Project) => projects.id === id);
    const [newProject, setNewProject] = useState<Project>(project ? project : new Project());

    const taskListProject: Task[] = initialTaskList.filter((taskListProject) => taskListProject.projectId === newProject.id);

    // Устанавливаем таски принадлежащие проекту, если в URL нет id - инициализируем пустым
    const [taskList, setTaskList] = useState<Task[]>(taskListProject ? taskListProject : [new Task()]);
    const [task, setTasks] = useState(requestTask(id));
    
    //Устанавливаем таску для редактирования, в нее попадают данные из формы
    const [taskForProject, setTaskForProject] = useState<Task>(requestTask(id));

    // Список проектов инициализируем данными с сервера
    const [projectList, setProjectList] = useState(initialProjectList);

    // Список сотрудников инициализируем данными с сервера
    const [employeeList, setEmployeeList] = useState(initialEmployeeList);

    //Список удаленных тасок. Временное хранилище перед отправкой на сервер
    const [deleteTaskList, setDeleteTaskList] = useState([]);

    // Запрашиваем таску или создаем новую
    function requestTask(id: string): Task {
        const target = server.getTasks().find((tasks: Task) => tasks.id === id);
        if (target) {
            return target
        } else return new Task();
    }

    // Установка в состояние данных из полей формы страницы Project
    const changeHandlerForProject = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (!newProject.id) {
            const id: string = Date.now().toString();
            newProject.id = id
        }
        setNewProject({...newProject, [e.target.name]: e.target.value});
    };

    // Добавление данных в состояние тасок, после редактирования
    const sendToStateTaskList = (task: Task) => {
        const targetIndex = taskList.findIndex((el) => el.id === task.id);

        if (targetIndex + 1) {
            taskList.splice(targetIndex, 1, task);
        } else
            taskList.push(task);
        setTaskEditForm(false);
    }

    // Отмена
    const onCancel = () => {
        navigate(-1);
    };

    const onCancelFormTask = () => {
        setTaskEditForm(false);
    };


    // Удаление из списка тасок на форме проекта
    const deleteTask = (id: string) => {
        // Добавляем элемент в массив "Удаленные элементы"
        const remoteTask = taskList.find((task: Task) => task.id === id);
        setDeleteTaskList([...deleteTaskList, remoteTask]);
        // Удаляем из списка задач элемент для отображения на экране
        const taskListNew = taskList.filter((task: Task) => task.id !== remoteTask.id);
        setTaskList([...taskListNew]);
    };

    // Переходим на страницу редактирования таски
    const updateTask = (id: string) => {
        // const task = taskList.find((tasks: Task) => tasks.id === id);

        setTasks(requestTask(id));
        console.log(taskForProject);
        setTaskEditForm(true);
    };

    // Создание таски из страницы редактирования проекты
    const addTask = () => {
        setTaskForProject(new Task());
        setTaskEditForm(true);
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
            taskList={taskList}
            employeeList={employeeList}
            deleteTask={deleteTask}
            updateTask={updateTask}
            addTask={addTask}
        />

    const taskEditFromProject =
        <TaskForm
            task={task}
            employeeList={employeeList}
            projectList={projectList}
            onPushStorage={sendToStateTaskList}
            onCancel={onCancelFormTask}
            sourceTaskForProject={true}
        />

    return (
        <>
            {isTaskEditForm ? taskEditFromProject : projectFormEdit}
        </>
    );
};

export default ProjectService;