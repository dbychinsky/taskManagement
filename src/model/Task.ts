import {TaskStatus} from "../util/convertToStrTaskStatus";

export class Task {
    id: string;
    status: TaskStatus;
    name: string;
    projectId: string | null;
    executionTime: number | null;
    startDate: string;
    endDate: string;
    employeeId: string | null;

    constructor() {
        this.id = '';
        this.status = TaskStatus.NotStarted;
        this.name = '';
        this.projectId = '';
        this.executionTime = null;
        this.startDate = '';
        this.endDate = '';
        this.employeeId = '';
    }
}