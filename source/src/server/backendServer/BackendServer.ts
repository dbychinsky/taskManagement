import {IServer} from "../IServer";
import {Project} from "../../model/Project";
import {Task} from "../../model/Task";
import {Employee} from "../../model/Employee";
import {TaskForm} from "../../pages/task/TaskEditForm";
import {DateFormatter} from "../../support/util/DateFormatter";

/**
 * Список адресов проектов/задач/исполнителей
 */
const enum backendServerUrl {
    PROJECT = "http://localhost:8080/api/projects",
    EMPLOYEE = "http://localhost:8080/api/employees",
    TASK = "http://localhost:8080/api/tasks"
}

/**
 * Сервис для работы с BackendServer
 */
export class BackendServer implements IServer {

    /**
     * Метод получения списка проектов
     *
     * @return {Project[]} список сотрудников
     */
    async getProjects(): Promise<Project[]> {
        return await this.load(backendServerUrl.PROJECT);
    };

    /**
     * Метод удаления проекта по его уникальному идентификатору
     *
     * @param {string} id уникальный идентификатор проекта
     * @return void
     */
    async deleteProject(id: string): Promise<void> {
        await this.delete(backendServerUrl.PROJECT, id);
    };

    /**
     * Метод сохранения проекта
     *
     * @param {Project} project проект для сохранения
     * @return void
     */
    async saveProject(project: Project): Promise<Project> {
        if (!project.id) {
            return await this.add(backendServerUrl.PROJECT, project);
        } else {
            return await this.update(backendServerUrl.PROJECT, project.id, project);
        }
    };

    /**
     * Метод получения списка задач
     * @return {Task[]} список задач
     */
    async getTasks(): Promise<Task[]> {
        const totalElements = await this.getTotalElements(backendServerUrl.TASK);
        return fetch(`${backendServerUrl.TASK}?size=${totalElements}`)
            .then(response => response.json())
            .then(response => response.content.map((elem: any) =>
                this.taskSerialize(elem)))
    };

    /**
     * Метод удаления задачи по ее уникальному идентификатору
     *
     * @param {string} id уникальный идентификатор задачи
     * @return void
     */
    async deleteTask(id: string): Promise<void> {
        await this.delete(backendServerUrl.TASK, id);
    };

    /**
     * Метод сохранения задачи
     *
     * @param {Task} task задача для сохранения
     * @return void
     */
    async saveTask(task: Task): Promise<void> {
        if (!task.id) {
            await this.add(backendServerUrl.TASK, task);
        } else {
            await this.update(backendServerUrl.TASK, task.id, task);
        }
    };

    /**
     * Метод получения списка сотрудников
     * @return {Employee[]} список сотрудников
     */
    async getEmployees(): Promise<Employee[]> {
        return await this.load(backendServerUrl.EMPLOYEE);
    };

    /**
     * Метод удаления сотрудника по его уникальному идентификатору
     *
     * @param {string} id уникальный идентификатор сотрудника
     * @return void
     */
    async deleteEmployee(id: string): Promise<void> {
        await this.delete(backendServerUrl.EMPLOYEE, id);
    };

    /**
     * Метод сохранения сотрудников
     *
     * @param {Employee} employee сотрудник для сохранения
     * @return void
     */
    async saveEmployee(employee: Employee): Promise<void> {
        if (!employee.id) {
            await this.add(backendServerUrl.EMPLOYEE, employee);
        } else {
            await this.update(backendServerUrl.EMPLOYEE, employee.id, employee);
        }
    };

    /**
     * Метод для загрузки данных
     *
     * @private
     * @param {string} requestUrl ключ для получения значения
     */
    private async load<T>(requestUrl: string): Promise<T[]> {
        const totalCounts = await this.getTotalElements(requestUrl);
        return await fetch(`${requestUrl}?size=${totalCounts}`)
            .then(response => response.json())
            .then<T[]>(data => data.content)
    };

    /**
     * Метод для получения общего количества записей
     *
     * @private
     * @param {string} requestUrl ключ для получения значения
     * @return {Promise<number>} количество записей
     */
    private async getTotalElements(requestUrl: string): Promise<number> {
        return await fetch(requestUrl)
            .then(response => response.json())
            .then(data => data.totalElements)
    };

    /**
     * Метод добавления данных
     *
     * @private
     * @param {string} url  ключ для получения значения
     * @param {any} object данные для сохранения
     */
    private async add<T>(requestUrl: string, object: T): Promise<T> {
        return await fetch(requestUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.statusText);
                }
            })
            .catch(error => {
                throw error
            }).then(response => response);
    }

    /**
     * Метод добавления данных
     *
     * @private
     * @param {string} url  ключ для получения значения
     * @param {any} object данные для сохранения
     */
    private async update<T>(requestUrl: string, id: string, object: T): Promise<T> {
        return await fetch(`${requestUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.statusText);
                }
            })
            .catch(error => {
                throw error
            }).then(response => response);
    }

    /**
     * Метод удаления данных
     *
     * @private
     * @param {string} url URL для удаления
     * @param {string} id идентификатор удаляемого обьекта
     */
    private async delete(url: string, id: string): Promise<void> {
        await fetch(`${url}/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    throw new Error(response.statusText);
                }
            })
            .catch(error => {
                console.log('error -', error);
            })
    };

    /**
     * Метод сериализации задачи.
     *
     * @param {TaskForm} taskFormData задача, сериализуемая для работы в
     * приложении
     * @return {Task}
     */
    private taskSerialize(taskFormData: TaskForm): Task {
        return Object.assign(new Task(), taskFormData, {
            startDate: DateFormatter.getDateFromStr(taskFormData.startDate),
            endDate: DateFormatter.getDateFromStr(taskFormData.endDate),
        });
    };
}