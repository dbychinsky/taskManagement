import {TaskStatuses} from "../../pages/task/TaskStatus";

/**
 * Конвертация статусов в строковое значение
 */

// Строковое значение статуса
export const getTaskStatusToString = (taskStatus: string) => {
    return TaskStatuses.map((status) => {
        if (status.statusId === taskStatus) return status.statusText
    })
}
