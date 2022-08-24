import TaskStatus from "./TaskStatus";

export class Task {
    id: string;
    status: TaskStatus;
    name: string;
    projectId: string | null;
    executionTime: number;
    startDate: string;
    endDate:  string;
    employeeId: string | null;

    constructor() {
        this.id = '';
        this.status = TaskStatus.NOT_STARTED;
        this.name = '';
        this.projectId = null;
        this.executionTime = 0;
        this.startDate = null;
        this.endDate = null;
        this.employeeId = null;
    }
}