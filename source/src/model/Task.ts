/**
 * Список возможных значений статуса
 */
export enum TaskStatus {

    /**
     * Не начата
     */
    NOT_STARTED = "NOT_STARTED",

    /**
     * В процессе
     */
    IN_PROGRESS = "IN_PROGRESS",

    /**
     * Завершена
     */
    COMPLETED = "COMPLETED",

    /**
     * Отложена
     */
    POSTPONED = "POSTPONED"
}

/**
 * Класс объекта Задачи
 */
export class Task {

    /**
     * Уникальный идентификатор задачи
     */
    id: string;

    /**
     * Статус задачи
     */
    status: TaskStatus;

    /**
     * Имя задачи
     */
    name: string;

    /**
     * Уникальный идентификатор проекта задачи
     */
    projectId: string | null;

    /**
     * Количество часов
     */
    executionTime: number | null;

    /**
     * Дата начала задачи
     */
    startDate: Date | null;

    /**
     * Дата окончания задачи
     */
    finishDate: Date | null;

    /**
     * Уникальный идентификатор сотрудника задачи
     */
    employeeId: string | null;

    constructor() {
        this.id = '';
        this.status = TaskStatus.NOT_STARTED;
        this.name = '';
        this.projectId = '';
        this.executionTime = null;
        this.startDate = null;
        this.finishDate = null;
        this.employeeId = '';
    }
}