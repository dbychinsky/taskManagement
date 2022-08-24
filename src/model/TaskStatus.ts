// Значения статуса
enum TaskStatus {
    // Не начата
    NOT_STARTED = "NOT_STARTED",
    // В процессе
    IN_PROGRESS = "IN_PROGRESS",
    // Завершена
    COMPLETED = "COMPLETED",
    // Отложена
    POSTPONED = "POSTPONED"
}

// Массив возможных значений статусов
export const taskStatuses: TaskStatus[] = [
    TaskStatus.NOT_STARTED,
    TaskStatus.POSTPONED,
    TaskStatus.COMPLETED,
    TaskStatus.IN_PROGRESS
]

// Строковое значение статуса
export const TaskStatusToString = {
    [TaskStatus.COMPLETED]: "Завершена",
    [TaskStatus.POSTPONED]: "Отложена",
    [TaskStatus.IN_PROGRESS]: "В процессе",
    [TaskStatus.NOT_STARTED]: "Не начата"
}

export default TaskStatus;

