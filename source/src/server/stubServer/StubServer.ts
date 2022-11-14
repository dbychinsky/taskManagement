import {Project} from "../../model/Project";
import {IServer} from "../IServer";
import {Employee} from "../../model/Employee";
import {Task} from "../../model/Task";
import {DateFormatter} from "../../support/util/DateFormatter";
import {TaskForm} from "../../pages/task/TaskEditForm";

/**
 * Сервис для работы localStorage
 */
export class StubServer implements IServer {

    /**
     * Ключ для работы с проектами
     */
    readonly PROJECT_LIST_KEY = 'PROJECT_LIST_KEY';

    /**
     * Ключ для работы с задачами
     */
    readonly TASK_LIST_KEY = 'TASK_LIST_KEY';

    /**
     * Ключ для работы с сотрудниками
     */
    readonly EMPLOYEE_LIST_KEY = 'EMPLOYEE_LIST_KEY';

    /**
     * Метод получения списка проектов
     * Проверка на наличие файла в localStorage, если файла localstorage
     * не существует - создать пустой
     *
     * @return {Project[]} список сотрудников
     */
    async getProjects(): Promise<Project[]> {
        const result = await this.load(this.PROJECT_LIST_KEY);
        if (result === null) {
            return []
        }
        return await result;
    }

    /**
     * Метод удаления проекта по его уникальному идентификатору
     *
     * @param {string} id уникальный идентификатор проекта
     * @return void
     */
    async deleteProject(id: string): Promise<void> {
        const projectList = await this.getProjects();
        const newProjectList = projectList.filter((project: Project) => project.id !== id);
        await this.save('PROJECT_LIST_KEY', newProjectList);
    }

    /**
     * Метод сохранения проекта.
     *
     * @param {Project} project проект для сохранения
     * @return {Project} Promise проекта
     */
    async saveProject(project: Project): Promise<Project> {
        let projectList: Project[] = await this.load(this.PROJECT_LIST_KEY);

        if (!project.id) {
            project.id = this.getId(projectList)
            projectList.push(project);
        } else {
            const targetIndex = projectList.findIndex((el) => el.id === project.id);
            projectList.splice(targetIndex, 1, project);
        }
        await this.save(this.PROJECT_LIST_KEY, projectList);

        return project
    }

    /**
     * Метод получения списка задач
     * Проверка на наличие файла в localStorage, если файла localstorage
     * не существует - создать пустой
     *
     * @return {Task[]} список задач
     */
    async getTasks(): Promise<Task[]> {
        const result: [] = await this.load(this.TASK_LIST_KEY);
        if (result === null) {
            return []
        }
        return result.map((elem: any) =>
            this.taskSerialize(elem)
        );
    }

    /**
     * Метод удаления задачи по ее уникальному идентификатору
     *
     * @param {string} id уникальный идентификатор задачи
     * @return void
     */
    async deleteTask(id: string): Promise<void> {
        const taskList = this.load(this.TASK_LIST_KEY);
        const newTaskList = taskList.filter((task: Task) => task.id !== id);
        await this.save('TASK_LIST_KEY', newTaskList);
    }

    /**
     * Метод сохранения задачи
     *
     * @param {Task} task задача для сохранения
     * @return void
     */
    async saveTask(task: Task): Promise<void> {
        let taskList: Task[] = this.load(this.TASK_LIST_KEY);

        if (taskList === null) {
            taskList = []
        }

        if (task.id.includes("tempID") || task.id === '') {
            task.id = this.getId(taskList);
            taskList.push(task);

        } else {
            const targetIndex = taskList.findIndex((el) => el.id === task.id);
            taskList.splice(targetIndex, 1, task);
        }
        this.save(this.TASK_LIST_KEY, taskList);
    }

    /**
     * Метод получения списка сотрудников
     * @return {Employee[]} список сотрудников
     */
    async getEmployees(): Promise<Employee[]> {
        const result = await this.load(this.EMPLOYEE_LIST_KEY);
        if (result === null) {
            return []
        }
        return await result;
    }

    /**
     * Метод удаления сотрудника по его уникальному идентификатору
     *
     * @param {string} id уникальный идентификатор сотрудника
     * @return void
     */
    async deleteEmployee(id: string): Promise<void> {
        const employeeList = await this.getEmployees();
        const newEmployeeList = employeeList.filter((employee: Employee) => employee.id !== id);
        await this.save('EMPLOYEE_LIST_KEY', newEmployeeList);
    }

    /**
     * Метод сохранения сотрудников
     *
     * @param {Employee} employee сотрудник для сохранения
     * @return void
     */
    async saveEmployee(employee: Employee): Promise<void> {
        let employeeList: Employee[] = await this.getEmployees();

        if (!employee.id) {
            employee.id = this.getId(employeeList);
            employeeList.push(employee)
        } else {
            const targetIndex = employeeList.findIndex((el) => el.id === employee.id);
            employeeList.splice(targetIndex, 1, employee);
        }

        await this.save(this.EMPLOYEE_LIST_KEY, employeeList);

    }

    /**
     * Метод для работы с localStorage - загрузка данных
     * из файла по ключу
     *
     * @private
     * @param {string} key ключ для получения значения
     */
    private load(key: string) {
        return JSON.parse(localStorage.getItem(key)!);
    }

    /**
     * Метод для работы с localStorage - сохранение данных
     * в файл по ключу
     *
     * @private
     * @param {string} key  ключ для получения значения
     * @param {any} object данные для сохранения
     */
    private save(key: string, object: any) {
        localStorage.setItem(key, JSON.stringify(object));
    }

    /**
     * Метод получения id для продукта
     */
    private getId<T extends { id: string }>(list: T[]): string {
        if (list.length) {
            return (Number(list[list.length - 1].id) + 1).toString()
        } else {
            return '0'
        }
    }

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
    }
}