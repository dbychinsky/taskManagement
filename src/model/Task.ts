export enum TaskStatus {
    NOT_STARTED = "NOT_STARTED",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETE = "COMPLETE",
    POSTPONED = "POSTPONED"
}

export class Task {
    id: string;
    status: TaskStatus;
    name: string;
    projectId: string | null;
    executionTime: number | null;
    startDate: Date | null;
    endDate: Date | null;
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