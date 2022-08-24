import {Employee} from "../../model/Employee";

// Интерфейс для сервиса Сотрудников
export interface IEmployeeServer {
    getEmployees(): Employee[];

    deleteEmployee(id: string): void;

    saveEmployee(employee: Employee): void;

}

