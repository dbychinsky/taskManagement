import {Task} from "../../model/Task";
import {ITaskServer} from "./ITaskServer";

class TaskServer implements ITaskServer {

    readonly TASK_LIST_KEY = 'TASK_LIST_KEY';

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

    private load(TASK_LIST_KEY: string) {
        return JSON.parse(localStorage.getItem(TASK_LIST_KEY)!);
    }

    private save(TASK_LIST_KEY: string, object: any) {
        localStorage.setItem(TASK_LIST_KEY, JSON.stringify(object));
    }
}

export const taskServer = new TaskServer();