import React, {useState} from 'react';
import {Project} from "../../model/Project";
import {useNavigate, useParams} from "react-router-dom";
import {server} from "../../app";
import {Task} from "../../model/Task";
import '../../components/list/List.scss';
import TaskEditForm from "../task/TaskEditForm";
import Header from "../../components/header/Header";
import Form, {FormFeedback} from "../../components/form/Form";
import Button from "../../components/button/Button";
import TaskListView from "../task/TaskListView";
import InputTextField from "../../components/fields/inputTextField/InputTextField";
import {validate} from "../../support/util/validate";
import {ErrorList, FieldList} from "../../support/typeListForAllApp";

const ProjectEdit = () => {

    const navigate = useNavigate();
    const {id} = useParams();
    const MAX_LENGTH: number = 50;

    const initialEmployeeList = server.getEmployees();
    const initialProjectList = server.getProjects();
    const initialTaskList = server.getTasks();

    // Состояние редактирования таски
    const [isTaskEditForm, setTaskEditForm] = useState<boolean>(false);

    // Устанавливаем проект для редактирования, если в URL нет id - инициализируем пустым
    const project: Project = initialProjectList.find((projects: Project) => projects.id === id);
    const [newProject, setNewProject] = useState<Project>(project ? project : new Project());

    // Устанавливаем таски принадлежащие проекту, если в URL нет id - инициализируем пустым
    const taskListProject: Task[] = initialTaskList.filter((taskListProject) => taskListProject.projectId === newProject.id);
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

    const fieldList: FieldList[] = [
        {
            name: "name",
            label: "Наименование:",
            field: <InputTextField
                type="text"
                value={newProject.name}
                changeHandler={sendToStateProjectList}
                name="name"
                maxLength={MAX_LENGTH}
                required={true}
            />
        },
        {
            name: "description",
            label: "Описание:",
            field: <InputTextField
                type="text"
                value={newProject.description}
                changeHandler={sendToStateProjectList}
                name={"description"}
                maxLength={MAX_LENGTH}
                required={true}
            />
        }
    ];

    // Формируем список ошибок на основе списка полей формы
    const [errorList, setErrorList] = useState<ErrorList[]>(
        fieldList.map(elem => {
            return {name: elem.field.props.name, isValid: true, errorMessage: ''}
        }));

    const [feedBackFormList, setFeedBackFormList] = useState<FormFeedback[]>([{
        isValid: true,
        errorMessage: ''
    }]);

    // Запрашиваем таску или создаем новую
    function requestTask(id: string): Task {
        const target = server.getTasks().find((tasks: Task) => tasks.id === id);
        if (target) {
            return target
        } else return new Task();
    }

    // Добавление в состояние данных из полей формы страницы project
    function sendToStateProjectList(e: React.ChangeEvent<HTMLInputElement>): void {
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
    const cancel = () => {
        navigate(-1);
    };

    const cancelFormTask = () => {
        setTaskEditForm(false);
    };

    // Удаление из списка тасок на форме проекта
    const remove = (id: string) => {
        // Добавляем элемент в массив "Удаленные элементы"
        const remoteTask = taskList.find((task: Task) => task.id === id);
        setDeleteTaskList([...deleteTaskList, remoteTask]);
        // Удаляем из списка задач элемент для отображения на экране
        const taskListNew = taskList.filter((task: Task) => task.id !== remoteTask.id);
        setTaskList([...taskListNew]);
    };

    // Переходим на страницу редактирования таски
    const update = (id: string) => {
        // Устанавливаем редактируюемую таску
        setTasks(requestTask(id));
        // Переходим на страницу редактирования
        setTaskEditForm(true);
    };

    // Создание таски из страницы редактирования проекты
    const add = () => {
        // Устанавливаем новую таску в состояние
        setTaskForProject(new Task());
        setTaskEditForm(true);
    }

    // Отправка данных на сервер
    const save = () => {
        const isValidFormField = validate.validateField(fieldList, errorList)
        setErrorList(isValidFormField => [...isValidFormField]);

        if (validate.isValidForm(errorList)) {
            // Сохранили проект
            server.saveProject(newProject);
            // Добавляем ID-проекта к таске
            addIdToTask(newProject.id);
            // Удалиляем таски, принадлежащие проекту и помеченные как "удаленные"
            deleteTaskList.forEach(function (task) {
                server.deleteTask(task.id);
            });
            // Сохраняем таски, созданные в проекте
            taskList.forEach(function (task) {
                server.saveTask(task);
            });
            navigate(-1);
        }
    }

    // После создания проекта, добавляем к таскам идентификатор проекта
    const addIdToTask = (newProjectId: string) => {
        taskList.forEach((task) => {
            task.projectId = newProjectId
        });
    }

    const projectFormEdit =
        <div className="projectForm">
            <Header title="Проект" isShowButton={false}/>
            <div className="content">
                <Form fieldList={fieldList}
                      feedBackForm={feedBackFormList}
                      errorList={errorList}
                      onSubmitForm={save}
                      onCancel={cancel}/>

                <div className="taskList">
                    <Button onClick={add} text="Добавить задачу"/>
                    <TaskListView taskList={taskList}
                                  employees={employeeList}
                                  projects={projectList}
                                  remove={remove}
                                  update={update}/>
                </div>
            </div>
        </div>

    const taskEditFromProject =
        <TaskEditForm
            task={task}
            employeeList={employeeList}
            projectList={projectList}
            onPushStorage={sendToStateTaskList}
            onCancel={cancelFormTask}
            sourceTaskForProject={true}
        />

    return (
        <>
            {isTaskEditForm ? taskEditFromProject : projectFormEdit}
        </>
    );
};

export default ProjectEdit;