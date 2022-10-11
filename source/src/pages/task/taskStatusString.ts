import {TaskStatuses} from "./TaskStatus";

/**
 * Конвертация статусов в строковое значение
 *
 * @param {string} taskStatus статус задачи
 */
export const getTaskStatusToString = (taskStatus: string) => {
    return TaskStatuses.map((status) => {
        if (status.statusId === taskStatus) return status.statusText
    })
};
