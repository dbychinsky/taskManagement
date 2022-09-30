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

/**
 * Страница обновления/добавления проекта
 */
const ProjectEdit = () => {

    const navigate = useNavigate();
    const {id} = useParams();

    /**
     * Максимально допустимая длинна для поля ввода
     */
    const MAX_LENGTH: number = 50;

    /**
     * Получение списков сотрудников, проектов, задач для начальной
     * инициализации
     */
    const initialEmployeeList = server.getEmployees();
    const initialProjectList = server.getProjects();
    const initialTaskList = server.getTasks();

    /**
     * Состояние редактирования таски, используется для условного рендера:
     * если true - отображаем страницу для редактирования
     */
    const [isTaskEditForm, setTaskEditForm] = useState<boolean>(false);

    /**
     * Получение данных проектов в случае редактирования, если в URL нет id -
     * инициализируем пустым
     */
    const project: Project = initialProjectList.find((projects: Project) => projects.id === id);
    const [newProject, setNewProject] = useState<Project>(project ? project : new Project());

    /**
     * Получаем и устанавливаем задачи в состояние, если в URL нет id -
     * инициализируем пустым
     */
    const taskListProject: Task[] = initialTaskList.filter((taskListProject) => taskListProject.projectId === newProject.id);
    const [taskList, setTaskList] = useState<Task[]>(taskListProject ? taskListProject : [new Task()]);

    /**
     * Задача для редактирования
     */
    const [task, setTasks] = useState(requestTask(id));

    /**
     * Редактируемая задача из страница Проекта, в ней хранятся данные из формы
     */
    const [taskForProject, setTaskForProject] = useState<Task>(requestTask(id));

    /**
     * Список проектов, инициализируется данным с сервера
     */
    const [projectList, setProjectList] = useState(initialProjectList);

    /**
     * Список сотрудников, инициализируется данным с сервера
     */
    const [employeeList, setEmployeeList] = useState(initialEmployeeList);

    /**
     * Список удаленных задач из страницы Проектов. Является временным
     * хранилищем перед отправкой данных сервер.
     */
    const [deleteTaskList, setDeleteTaskList] = useState([]);

    /**
     * Список полей для обновления/добавления сотрудника:
     * name: имя поля
     * label: текстовое отображение имени поля
     * field: поле
     */
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

    /**
     * Метод для формирования списка ошибок на основе полей формы
     * и добавление их в состояние
     */
    const [errorList, setErrorList] = useState<ErrorList[]>(
        fieldList.map(elem => {
            return {name: elem.field.props.name, isValid: true, errorMessage: ''}
        }));

    /**
     * Список информационных сообщений для всей формы (ошибок)
     */
    const [feedBackFormList, setFeedBackFormList] = useState<FormFeedback[]>([{
        isValid: true,
        errorMessage: ''
    }]);

    /**
     * Метода получения задачи по id, если идентификтор отсутствует -
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
     * Метод для установки в состояние данных из полей формы
     */
    function sendToStateProjectList(e: React.ChangeEvent<HTMLInputElement>): void {
        // Добавление id если отстутсвует
        if (!newProject.id) {
            const id: string = Date.now().toString();
            newProject.id = id
        }
        setNewProject({...newProject, [e.target.name]: e.target.value});
    };

    /**
     * Метод для добавления данных в состояние тасок,
     * после их редактирования
     *
     * @param task задача
     */
    const sendToStateTaskList = (task: Task) => {
        // находим индекс (findIndex если не находит, получаем -1) (splice работает с индексом)
        const targetIndex = taskList.findIndex((el) => el.id === task.id);
        // 0, -1 = false, все другое true
        if (targetIndex + 1) {
            taskList.splice(targetIndex, 1, task);
        } else
            taskList.push(task);
        setTaskEditForm(false);
    }

    /**
     * Метод отмены
     */
    const cancel = () => {
        navigate(-1);
    };

    /**
     * Метод изменения состояния отображения формы
     * редактирования задач
     */
    const cancelFormTask = () => {
        setTaskEditForm(false);
    };

    /**
     * Метод удаления из списка задач из страницы
     * проекта. Удаляемая задача добавляется в список
     * (временный буфер) "Удаленные элементы" и, в случае,
     * отправки данных редактирования проекта, задача удаляется
     * на сервере.
     *
     * @param id идентификатор задачи
     */
    const remove = (id: string) => {
        // Добавляем элемент в массив "Удаленные элементы"
        const remoteTask = taskList.find((task: Task) => task.id === id);
        setDeleteTaskList([...deleteTaskList, remoteTask]);
        // Удаляем из списка задач элемент для отображения на экране
        const taskListNew = taskList.filter((task: Task) => task.id !== remoteTask.id);
        setTaskList([...taskListNew]);
    };

    /**
     * Метод обновления задачи, переход на страницу
     * обновления
     *
     * @param id идентификатор задачи
     */
    const update = (id: string) => {
        // Устанавливаем редактируюемую таску
        setTasks(requestTask(id));
        // Переходим на страницу редактирования
        setTaskEditForm(true);
    };

    /**
     * Метод создания задачаи из страницы реадтирования
     * проекта
     */
    const add = () => {
        // Устанавливаем новую таску в состояние
        setTaskForProject(new Task());
        setTaskEditForm(true);
    }

    /**
     * Метод добавления к новым задачам идентификатора проета,
     * которые были созданы из страницы проектов.
     *
     * @param newProjectId идентификатор проекта
     */
    const addIdToTask = (newProjectId: string) => {
        taskList.forEach((task) => {
            task.projectId = newProjectId
        });
    }

    /**
     * Метод для добавления проекта, вызываемый при нажатии кнопки "Сохранить",
     * если все поля формы валидны, сохраняем проект на сервере,
     * добавляем id проекта к задаче (созданной из проекта),
     * удаляем задачи с сервера (помеченные как удаленные),
     * сохраняем на сервере задачи созданные из страницы проекта
     *
     */
    const save = () => {
        const isValidFormField = validate.validateField(fieldList, errorList)
        setErrorList(isValidFormField => [...isValidFormField]);

        if (validate.isValidForm(errorList)) {
            // Сохранили проект
            server.saveProject(newProject);
            // Добавляем ID-проекта к таске
            addIdToTask(newProject.id);
            // Удаляем таски, принадлежащие проекту и помеченные как "удаленные"
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
                                  employeeList={employeeList}
                                  projectList={projectList}
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