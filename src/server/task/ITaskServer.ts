import {Task} from "../../model/Task";

export interface ITaskServer {
    getTasks(): Task[];

    deleteTask(id: string): void;

    saveTask(task: Task): void;
}

