// Перечисление статусов

import {TaskStatuses} from "../model/TaskStatus";

export enum TaskStatus {
    NotStarted = "NotStarted",
    InProgress = "InProgress",
    Completed = "Completed",
    Postponed = "Postponed"
}

// Строковое значение статуса
export const getTaskStatusToString = (taskStatus: string) => {
    return TaskStatuses.map((status) => {
        if (status.statusId === taskStatus) return status.statusText
    })
}
