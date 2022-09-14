import {TaskStatus} from "../util/convertToStrTaskStatus";

export class Task {
    id: string;
    status: TaskStatus;
    name: string;
    projectId: string | null;
    executionTime: number | null;
    startDate: Date;
    endDate: Date;
    employeeId: string | null;

    constructor() {
        this.id = '';
        this.status = TaskStatus.NOT_STARTED;
        this.name = '';
        this.projectId = '';
        this.executionTime = null;
        this.startDate = null;
        this.endDate = null;
        this.employeeId = '';
    }
}