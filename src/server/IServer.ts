import {Employee} from "../model/Employee";
import {Project} from "../model/Project";
import {Task} from "../model/Task";

export interface IServer {

    getProjects(): Project[];

    deleteProject(id: string): void;

    saveProject(project: Project): void;

    getTasks(): Task[];

    deleteTask(id: string): void;

    saveTask(task: Task): void;

    getEmployees(): Employee[];

    deleteEmployee(id: string): void;

    saveEmployee(employee: Employee): void;


}