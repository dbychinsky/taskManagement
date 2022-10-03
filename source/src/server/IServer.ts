import {Employee} from "../model/Employee";
import {Project} from "../model/Project";
import {Task} from "../model/Task";

/**
 * Интерфейс для для работы с сервером
 */
export interface IServer {

    /**
     * Интерфейс получения списка проектов
     * @return {Project} список проектов
     */
    getProjects(): Project[];

    /**
     * Интерфейс удаления проекта по его уникальному идентификатору
     *
     * @param {string} id уникальный идентификатор проекта
     * @return void
     */
    deleteProject(id: string): void;

    /**
     * Интерфейс сохранения проекта
     *
     * @param {Project} project проект для сохранения
     * @return void
     */
    saveProject(project: Project): void;

    /**
     * Интерфейс получения списка задач
     * @return {Task[]} список задач
     */
    getTasks(): Task[];

    /**
     * Интерфейс удаления задачи по ее уникальному идентификатору
     *
     * @param {string} id уникальный идентификатор задачи
     * @return void
     */
    deleteTask(id: string): void;

    /**
     * Интерфейс сохранения задачи
     *
     * @param {Task} task задача для сохранения
     * @return void
     */
    saveTask(task: Task): void;

    /**
     * Интерфейс получения списка сотрудников
     * @return {Employee[]} список сотрудников
     */
    getEmployees(): Employee[];

    /**
     * Интерфейс удаления сотрудника по его уникальному идентификатору
     *
     * @param {string} id уникальный идентификатор сотрудника
     * @return void
     */
    deleteEmployee(id: string): void;

    /**
     * Интерфейс сохранения сотрудников
     *
     * @param {Employee} employee сотрудник для сохранения
     * @return void
     */
    saveEmployee(employee: Employee): void;

}