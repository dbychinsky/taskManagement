import {Employee} from "../model/Employee";
import {Project} from "../model/Project";
import {Task} from "../model/Task";

export interface IServer {

    getEmployees(): Employee[];

    getProjects(): Project[];

    getTasks(): Task[];

    deleteEmployee(id: string): void;

    deleteProject(id: string): void;

    deleteTask(id: string): void;

    saveEmployee(employee: Employee): void;

    saveProject(project: Project): void;

    saveTask(task: Task): void;

}