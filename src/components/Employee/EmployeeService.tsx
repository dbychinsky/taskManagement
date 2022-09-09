import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {server} from "../../App";
import EmployeeForm from "./EmployeeForm";
import {Task} from "../../model/Task";
import {Employee} from "../../model/Employee";

const EmployeeService = () => {

    const navigate = useNavigate();
    const {id} = useParams();
    const initialNewEmployee = {id: '', lastName: '', firstName: '', middleName: '', position: '', fullName: ''};
    const initialEmployeeList = server.getEmployees();
    const initialEmployee = server.getEmployees().find((employee: Employee) => employee.id === id);
    const [employee, setEmployee] = useState<Employee>(initialEmployee ? initialEmployee : initialNewEmployee);


    // Установка в состояние данных из полей формы страницы Task
    const changeHandlerEmployee = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        if (employee.id !== '') {
            setEmployee({...employee, [e.currentTarget.name]: e.currentTarget.value});
        } else {
            const id: string = Date.now().toString();
            setEmployee({...employee, id, [e.currentTarget.name]: e.currentTarget.value});
        }
        console.log(employee)
    };

    const onPushStorage = () => {
        // Добавление ФИО

        const newEmployees: Employee = {
            ...employee,
            fullName: `${employee.lastName} ${employee.firstName} ${employee.middleName}`
        }
        server.saveEmployee(newEmployees);
        navigate(-1);
    }

    // Отмена
    const onCancel = () => {
        navigate(-1);
    };

    return (
        <EmployeeForm
            employee={employee}
            onPushStorage={onPushStorage}
            onCancel={onCancel}
            changeHandlerEmployee={changeHandlerEmployee}
        />
    );
};

export default EmployeeService;