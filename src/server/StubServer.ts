import {Project} from "../model/Project";
import {IServer} from "./IServer";
import {Employee} from "../model/Employee";
import {Task} from "../model/Task";

export class StubServer implements IServer {

    readonly TASK_LIST_KEY = 'TASK_LIST_KEY';
    readonly EMPLOYEE_LIST_KEY = 'EMPLOYEE_LIST_KEY';
    readonly PROJECT_LIST_KEY = 'PROJECT_LIST_KEY';

    deleteTask(id: string): void {
        const taskList = this.getTasks();
        const newTaskList = taskList.filter((task: Task) => task.id !== id);
        this.save('TASK_LIST_KEY', newTaskList);
    }

    getTasks(): Task[] {
        const result = this.load(this.TASK_LIST_KEY);
        // TODO подумать что с этим делать, проверка если файла localstorage не существует
        if (result === null) {
            return []
        }
        return result;
    }

    saveTask(task: Task): void {
        let tasks: Task[] = this.getTasks();
        tasks.push(task);
        this.save(this.TASK_LIST_KEY, tasks);
    }

    deleteEmployee(id: string): void {
        const employeeList = this.getEmployees();
        const newEmployeeList = employeeList.filter((employee: Employee) => employee.id !== id);
        this.save('EMPLOYEE_LIST_KEY', newEmployeeList);
    }

    getEmployees(): Employee[] {
        const result = this.load(this.EMPLOYEE_LIST_KEY);
        if (result === null) {
            return []
        }
        return result;
    }

    saveEmployee(employee: Employee): void {
        let employees: Employee[] = this.getEmployees();
        employees.push(employee);
        this.save(this.EMPLOYEE_LIST_KEY, employees);
    }

    deleteProject(id: string): void {
        const projectList = this.getProjects();
        const newProjectList = projectList.filter((project: Project) => project.id !== id);
        this.save('PROJECT_LIST_KEY', newProjectList);
    }

    getProjects(): Project[] {
        const result = this.load(this.PROJECT_LIST_KEY);
        if (result === null) {
            return []
        }
        return result;
    }

    saveProject(project: Project): void {
        let projects: Project[] = this.getProjects();
        projects.push(project);
        this.save(this.PROJECT_LIST_KEY, projects);
    }

    private load(key: string) {
        return JSON.parse(localStorage.getItem(key)!);
    }

    private save(key: string, object: any) {
        localStorage.setItem(key, JSON.stringify(object));
    }
}