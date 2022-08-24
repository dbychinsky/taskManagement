import {Employee} from "../../model/Employee";
import {IEmployeeServer} from "./IEmployeeServer";

class EmployeeServer implements IEmployeeServer {

    readonly EMPLOYEE_LIST_KEY = 'EMPLOYEE_LIST_KEY';

    deleteEmployee(id: string): void {
        const employeeList = this.getEmployees();
        const newEmployeeList = employeeList.filter((employee: Employee) => employee.id !== id);
        this.save('EMPLOYEE_LIST_KEY', newEmployeeList);
    }

    getEmployees(): Employee[] {
        const result = this.load(this.EMPLOYEE_LIST_KEY);

        // TODO подумать что с этим делать, проверка если файла localstorage не существует
        if (result === null) {
            return []
        }
        return result;
    }

    saveEmployee(employee: Employee): void {
        let employees: Employee[] = this.getEmployees();
        employees.push(employee);
        this.save(this.EMPLOYEE_LIST_KEY, employees);

    }

    private load(EMPLOYEE_LIST_KEY: string) {
        return JSON.parse(localStorage.getItem(EMPLOYEE_LIST_KEY)!);
    }

    private save(EMPLOYEE_LIST_KEY: string, object: any) {
        localStorage.setItem(EMPLOYEE_LIST_KEY, JSON.stringify(object));
    }

}

export const employeeServer = new EmployeeServer();