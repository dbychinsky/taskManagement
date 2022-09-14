// Перечисление статусов

import {TaskStatuses} from "../model/TaskStatus";

export enum TaskStatus {
    NOT_STARTED = "NOT_STARTED",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETE = "COMPLETE",
    POSTPONED = "POSTPONED"
}

// Строковое значение статуса
export const getTaskStatusToString = (taskStatus: string) => {
    return TaskStatuses.map((status) => {
        if (status.statusId === taskStatus) return status.statusText
    })
}
