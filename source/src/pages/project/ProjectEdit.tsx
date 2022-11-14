import React, {useEffect, useState} from 'react';
import {Project} from "../../model/Project";
import {useNavigate, useParams} from "react-router-dom";
import {server} from "../../app";
import {Task} from "../../model/Task";
import '../../components/list/List.scss';
import TaskEditForm from "../task/TaskEditForm";
import Header from "../../components/header/Header";
import Form, {Field, ErrorMessage} from "../../components/form/Form";
import Button from "../../components/button/Button";
import TaskListView from "../task/TaskListView";
import InputTextField from "../../components/fields/inputTextField/InputTextField";
import {validate} from "../../support/util/Validate";

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
     * Список сотрудников, инициализируется данным с сервера
     */
    const [employeeList, setEmployeeList] = useState([]);
    useEffect(() => {
        server.getEmployees()
            .then(response => setEmployeeList(response))
            .catch(error => console.log(error))
    }, []);

    /**
     * Список проектов, инициализируется данными с сервера
     */
    const [projectList, setProjectList] = useState<Project[]>([]);
    useEffect(() => {
        server.getProjects()
            .then(response => setProjectList(response))
            .catch(error => console.log(error))
    }, []);

    /**
     * Получение данных проектов в случае редактирования (из projectList),
     * если в URL нет id - инициализируем пустым
     */
    const [newProject, setNewProject] = useState<Project>(new Project());
    useEffect(() => {
        const targetTask = projectList.find((project: Project) => project.id === id)
        if (!targetTask) {
            setNewProject(new Project());
        } else {
            setNewProject(targetTask);
        }
    }, [projectList]);

    /**
     * Состояние редактирования таски, используется для условного рендера:
     * если true - отображаем страницу для редактирования
     */
    const [isTaskEditForm, setTaskEditForm] = useState<boolean>(false);

    /**
     * Получаем и устанавливаем задачи (принадлежащие проекту) в состояние
     */
    const [taskList, setTaskList] = useState<Task[]>([]);
    useEffect(() => {
        server.getTasks()
            .then(response => setTaskList(response
                .filter((response) => response.projectId === id)))
            .catch(error => console.log(error))
    }, []);

    /**
     * Редактируемая задача
     */
    const [taskEdit, setTaskEdit] = useState<Task>(requestTask(id));

    /**
     * Список удаленных задач из страницы Проектов. Является временным
     * хранилищем перед отправкой данных сервер.
     */
    const [deleteTaskList, setDeleteTaskList] = useState<Task[]>([]);

    /**
     * Метод получения задачи по id, если идентификтор отсутствует -
     * создаем новую
     *
     * @param id идентификатор задачи
     */
    function requestTask(id: string): Task {
        const target = taskList.find((tasks: Task) => tasks.id === id)
        if (target) {
            return target
        } else return new Task();
    };

    /**
     * Метод для установки в состояние данных из полей формы,
     * добавляем id если отстутсвует
     *
     * @param e {React.ChangeEvent}
     */
    function sendToStateProjectList(e: React.ChangeEvent<HTMLInputElement>): void {
        setNewProject({...newProject, [e.target.name]: e.target.value});
    };

    /**
     * Метод для добавления данных в состояние тасок,
     * после их редактирования
     *
     * @param {Task} task задача
     */
    const sendToStateTaskList = (task: Task) => {
        const id: string = `tempID_${Date.now().toString()}`;
        const targetIndex = taskList.findIndex((el) => el.id === task.id);
        if (targetIndex + 1) {
            taskList.splice(targetIndex, 1, task);
        } else {
            task.id = id;
            taskList.push(task);
        }
        setTaskEditForm(false);
    };

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
    const removeTask = (id: string) => {
        const remoteTask: Task = taskList.find((task: Task) => task.id === id);
        setDeleteTaskList([...deleteTaskList, remoteTask]);

        const taskListNew = taskList.filter((task: Task) => task.id !== remoteTask.id);
        setTaskList([...taskListNew]);
    };

    /**
     * Метод обновления задачи, переход на страницу
     * обновления
     *
     * @param id идентификатор задачи
     */
    const updateTask = (id: string) => {
        setTaskEdit(requestTask(id));
        setTaskEditForm(true);
    };

    /**
     * Метод создания задачи из страницы редатирования проекта
     */
    const addTask = () => {
        setTaskEdit(new Task());
        setTaskEditForm(true);
    };

    /**
     * Метод добавления к новым задачам идентификатора проекта,
     * которые были созданы из страницы проектов.
     *
     * @param newProjectId идентификатор проекта
     */
    const addIdToTask = (newProjectId: string) => {
        taskList.forEach((task) => {
            task.projectId = newProjectId
        });
    };

    /**
     * Список полей для обновления/добавления сотрудника:
     *
     * name: имя поля
     * label: текстовое отображение имени поля
     * field: поле
     */
    const fieldList: Field[] = [
        {
            name: "name",
            label: "Наименование:",
            field: <InputTextField
                type="text"
                value={newProject.name}
                changeHandler={sendToStateProjectList}
                name="name"
                maxLength={MAX_LENGTH}
            />,
            validationList: [validate.emptyValidator]
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
            />,
            validationList: [validate.emptyValidator]
        }
    ];

    /**
     * Метод для формирования списка ошибок на основе полей формы
     * и добавление их в состояние
     */
    const [errorListState, setErrorListState] = useState<ErrorMessage[]>(
        fieldList.map(elem => {
            return {name: elem.field.props.name, errorMessage: ''}
        }));

    /**
     * Метод для добавления проекта, вызываемый при нажатии кнопки "Сохранить",
     * если все поля формы валидны, сохраняем проект на сервере,
     * добавляем id проекта к задаче (созданной из проекта),
     * удаляем задачи с сервера (помеченные как удаленные),
     * сохраняем на сервере задачи созданные из страницы проекта
     */
    const save = () => {
        server.saveProject(newProject)
            .then(response => {
                    addIdToTask(response.id)
                }
            )
            .then(() =>
                deleteTaskList.forEach(function (task) {
                    server.deleteTask(task.id).then();
                }))
            .then(() => {
                taskList.forEach(function (task: Task) {
                    server.saveTask(task).then();
                })
            })
            .then(() => {
                navigate(-1)
            })
            .catch(error => console.log(error))
    };

    const projectFormEdit =
        <div className="projectForm">
            <Header title="Проект" isShowButton={false}/>
            <div className="content">
                <Form fieldList={fieldList}
                      onSubmitForm={save}
                      onCancel={cancel}/>

                <div className="taskList">
                    <Button onClick={addTask} text="Добавить задачу"/>
                    <TaskListView taskList={taskList}
                                  employeeList={employeeList}
                                  projectList={projectList}
                                  remove={removeTask}
                                  update={updateTask}/>
                </div>
            </div>
        </div>

    const taskEditFromProject =
        <TaskEditForm
            task={taskEdit}
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