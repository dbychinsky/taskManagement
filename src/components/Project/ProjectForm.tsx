import React, {useState} from 'react';
import {Project} from "../../model/Project";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import {server} from "../../App";
import Button from "../Button/Button";
import InputTextField from "../InputTextField/InputTextField";
import {Task} from "../../model/Task";
import './ProjectForm.scss';
import './../List/List.scss';
import TaskList from "../Task/TaskList";
import {PROJECT_FORM, TASK_FORM, TASK_FORM_PROJECT, TASK_FORM_PROJECT_ID, TASK_PAGE} from "../../RoutersProject";

const ProjectForm = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    const initialNewProject = {id: '', name: '', description: ''};
    const initialEmployeeList = server.getEmployees();
    const initialProjectList = server.getProjects();
    const initialTaskList = server.getTasks();

    // Получаем проект для редактирования
    const project = initialProjectList.find((projects: Project) => projects.id === id);
    const [newProject, setNewProject] = useState<Project>(project ? project : initialNewProject);

    // Получаем таски, принадлежащие проекту
    const task = initialTaskList.filter((task) => task.projectId === newProject.id);
    const [taskList, setTaskList] = useState<Task[]>(task ? task : initialTaskList);

    const [projectList, setProjectList] = useState(initialProjectList);
    const [employeeList, setEmployeeList] = useState(initialEmployeeList);

    //Список для удаления
    const [deleteTaskList, setDeleteTaskList] = useState([]);

    // Установка в state данных из input
    const changeHandler = (fieldName: string) => (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (newProject.id !== '') {
            setNewProject({...newProject, [fieldName]: e.currentTarget.value});
        } else {
            const id: string = Date.now().toString();
            setNewProject({...newProject, id, [fieldName]: e.currentTarget.value});
        }
    };

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
    };

    const onPushStorage = () => {
        deleteTaskList.forEach(function (task) {
            server.deleteTask(task.id);
        });
        server.saveProject(newProject);
        navigate(-1);
    };

    const onCancel = () => {
        navigate(-1);
    };

    const deleteTaskFromProject = (id: string) => {
        // Добавляем элемент в массив "Удаленные элементы"
        const remoteTask = taskList.find((task: Task) => task.id === id);
        setDeleteTaskList([...deleteTaskList, remoteTask]);
        // Удаляем из списка задач элемент для отображения на экране 
        const taskListNew = taskList.filter((task: Task) => task.id !== remoteTask.id);
        setTaskList([...taskListNew])
    };

    const updateTaskFromProject = (id: string) => {

        navigate(TASK_FORM_PROJECT + id);
    };

    const fieldList = [
        {
            label: "Имя проекта:",
            name: "name",
            value: newProject.name,
            required: true

        },
        {
            label: "Описание проекта:",
            name: "description",
            value: newProject.description,
        }
    ];

    return (
        <div className="projectForm">
            <form onSubmit={submitHandler}>
                {
                    fieldList.map(({label, name, value, required}, index) =>
                        <div className="formRow" key={index}>
                            <label>{label}</label>
                            <InputTextField
                                type="text"
                                value={value}
                                onChange={changeHandler(name)}
                                name={name}/>
                        </div>
                    )
                }
                <div className="actionBar">
                    <Button onClick={onPushStorage} text="Сохранить"/>
                    <Button onClick={onCancel} text="Отмена"/>
                </div>
            </form>

            <div className="TaskList">
                <div className="actionBar">
                    <Link className="button" to={TASK_FORM_PROJECT}>Добавить</Link>
                </div>
                <TaskList tasks={taskList}
                          employees={employeeList}
                          projects={projectList}
                          deleteTask={deleteTaskFromProject}
                          updateTask={updateTaskFromProject}/>
            </div>
        </div>
    );
};

export default ProjectForm;