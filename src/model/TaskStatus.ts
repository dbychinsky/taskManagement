import {TaskStatus} from "../util/convertToStrTaskStatus";

export const TaskStatuses = [
    {statusId: TaskStatus.Completed, statusText: 'Завершена'},
    {statusId: TaskStatus.Postponed, statusText: 'Отложена'},
    {statusId: TaskStatus.InProgress, statusText: 'В процессе'},
    {statusId: TaskStatus.NotStarted, statusText: 'Не начата'}
];



