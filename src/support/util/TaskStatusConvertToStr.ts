// Перечисление статусов

import {TaskStatuses} from "../../pages/task/TaskStatus";

// Строковое значение статуса
export const getTaskStatusToString = (taskStatus: string) => {
    return TaskStatuses.map((status) => {
        if (status.statusId === taskStatus) return status.statusText
    })
}
