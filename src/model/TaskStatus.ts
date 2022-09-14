import {TaskStatus} from "../util/convertToStrTaskStatus";

export const TaskStatuses = [
    {statusId: TaskStatus.COMPLETE, statusText: 'Завершена'},
    {statusId: TaskStatus.POSTPONED, statusText: 'Отложена'},
    {statusId: TaskStatus.IN_PROGRESS, statusText: 'В процессе'},
    {statusId: TaskStatus.NOT_STARTED, statusText: 'Не начата'}
];



