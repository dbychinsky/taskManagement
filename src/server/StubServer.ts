import {Project} from "../model/Project";
import {IServer} from "./IServer";
import {Employee} from "../model/Employee";
import {Task} from "../model/Task";
import {ConvertDate} from "../support/util/convertDate";

/**
 * Класс для работы с сервером
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
     *
     * @return {Project[]} список сотрудников
     */
    getProjects(): Project[] {
        const result = this.load(this.PROJECT_LIST_KEY);
        if (result === null) {
            return []
        }
        return result;
    }

    /**
     * Метод удаления проекта по его уникальному идентификатору
     *
     * @param {string} id уникальный идентификатор проекта
     * @return void
     */
    deleteProject(id: string): void {
        const projectList = this.getProjects();
        const newProjectList = projectList.filter((project: Project) => project.id !== id);
        this.save('PROJECT_LIST_KEY', newProjectList);
    }

    /**
     * Метод сохранения проекта
     *
     * @param {Project} project проект для сохранения
     * @return void
     */
    saveProject(project: Project): void {
        let projectList: Project[] = this.getProjects();
        // находим индекс (findIndex если не находит, получаем -1) (splice работает с индексом)
        const targetIndex = projectList.findIndex((el) => el.id === project.id);
        // 0, -1 = false, все другое true
        if (targetIndex + 1) {
            projectList.splice(targetIndex, 1, project);
        } else
            projectList.push(project);
        this.save(this.PROJECT_LIST_KEY, projectList);
    }

    /**
     * Метод получения списка задач
     * @return {Task[]} список задач
     */
    getTasks(): Task[] {
        const result = this.load(this.TASK_LIST_KEY);
        // Проверка на наличие файла в localStorage, если файла localstorage
        // не существует - создать пустой
        if (result === null) {
            return []
        }
        // конвертируем строку в дату
        return result.map((elem: any) => {
            return Object.assign(new Task(), elem, {
                startDate: ConvertDate.getDateFromStr(elem.startDate),
                endDate: ConvertDate.getDateFromStr(elem.endDate),
            })
        });
    }

    /**
     * Метод удаления задачи по ее уникальному идентификатору
     *
     * @param {string} id уникальный идентификатор задачи
     * @return void
     */
    deleteTask(id: string): void {
        const taskList = this.getTasks();
        const newTaskList = taskList.filter((task: Task) => task.id !== id);
        this.save('TASK_LIST_KEY', newTaskList);
    }

    /**
     * Метод сохранения задачи
     *
     * @param {Task} task задача для сохранения
     * @return void
     */
    saveTask(task: Task): void {
        let taskList: Task[] = this.getTasks();
        // находим индекс (findIndex если не находит, получаем -1) (splice работает с индексом)
        const targetIndex = taskList.findIndex((el) => el.id === task.id);
        // 0, -1 = false, все другое true
        if (targetIndex + 1) {
            taskList.splice(targetIndex, 1, task);
        } else
            taskList.push(task);
        this.save(this.TASK_LIST_KEY, taskList);
    }

    /**
     * Метод получения списка сотрудников
     * @return {Employee[]} список сотрудников
     */
    getEmployees(): Employee[] {
        const result = this.load(this.EMPLOYEE_LIST_KEY);
        // Проверка на наличие файла в localStorage, если файла localstorage
        // не существует - создать пустой
        if (result === null) {
            return []
        }
        return result;
    }

    /**
     * Метод удаления сотрудника по его уникальному идентификатору
     *
     * @param {string} id уникальный идентификатор сотрудника
     * @return void
     */
    deleteEmployee(id: string): void {
        const employeeList = this.getEmployees();
        const newEmployeeList = employeeList.filter((employee: Employee) => employee.id !== id);
        this.save('EMPLOYEE_LIST_KEY', newEmployeeList);
    }

    /**
     * Метод сохранения сотрудников
     *
     * @param {Employee} employee сотрудник для сохранения
     * @return void
     */
    saveEmployee(employee: Employee): void {
        let employeeList: Employee[] = this.getEmployees();
        // находим индекс (findIndex если не находит, получаем -1) (splice работает с индексом)
        const targetIndex = employeeList.findIndex((el) => el.id === employee.id);
        // 0, -1 = false, все другое true
        if (targetIndex + 1) {
            employeeList.splice(targetIndex, 1, employee);
        } else
            employeeList.push(employee);
        this.save(this.EMPLOYEE_LIST_KEY, employeeList);
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
}