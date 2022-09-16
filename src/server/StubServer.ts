import {Project} from "../model/Project";
import {IServer} from "./IServer";
import {Employee} from "../model/Employee";
import {Task} from "../model/Task";
import {ConvertDate} from "../support/util/convertDate";

export class StubServer implements IServer {

    readonly PROJECT_LIST_KEY = 'PROJECT_LIST_KEY';
    readonly TASK_LIST_KEY = 'TASK_LIST_KEY';
    readonly EMPLOYEE_LIST_KEY = 'EMPLOYEE_LIST_KEY';

    getProjects(): Project[] {
        const result = this.load(this.PROJECT_LIST_KEY);
        if (result === null) {
            return []
        }
        return result;
    }

    deleteProject(id: string): void {
        const projectList = this.getProjects();
        const newProjectList = projectList.filter((project: Project) => project.id !== id);
        this.save('PROJECT_LIST_KEY', newProjectList);
    }

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


    getTasks(): Task[] {
        const result = this.load(this.TASK_LIST_KEY);
        // TODO подумать что с этим делать, проверка если файла localstorage не существует
        if (result === null) {
            return []
        }
        // данные приходят в виде строки, конвертим обратно в дату
        return result.map((elem: any) => {
            return Object.assign(new Task(), elem, {
                startDate: ConvertDate.getDateFromStr(elem.startDate),
                endDate: ConvertDate.getDateFromStr(elem.endDate),
            })
        });
    }

    deleteTask(id: string): void {
        const taskList = this.getTasks();
        const newTaskList = taskList.filter((task: Task) => task.id !== id);
        this.save('TASK_LIST_KEY', newTaskList);
    }


    saveTask(task: Task): void {
        let taskList: Task[] = this.getTasks();
        const targetIndex = taskList.findIndex((el) => el.id === task.id);
        if (targetIndex + 1) {
            taskList.splice(targetIndex, 1, task);
        } else
            taskList.push(task);
        this.save(this.TASK_LIST_KEY, taskList);
    }

    getEmployees(): Employee[] {
        const result = this.load(this.EMPLOYEE_LIST_KEY);
        if (result === null) {
            return []
        }
        return result;
    }

    deleteEmployee(id: string): void {
        const employeeList = this.getEmployees();
        const newEmployeeList = employeeList.filter((employee: Employee) => employee.id !== id);
        this.save('EMPLOYEE_LIST_KEY', newEmployeeList);
    }


    saveEmployee(employee: Employee): void {
        let employeeList: Employee[] = this.getEmployees();
        const targetIndex = employeeList.findIndex((el) => el.id === employee.id);
        if (targetIndex + 1) {
            employeeList.splice(targetIndex, 1, employee);
        } else
            employeeList.push(employee);
        this.save(this.EMPLOYEE_LIST_KEY, employeeList);
    }


    private load(key: string) {
        return JSON.parse(localStorage.getItem(key)!);
    }

    private save(key: string, object: any) {
        localStorage.setItem(key, JSON.stringify(object));
    }
}