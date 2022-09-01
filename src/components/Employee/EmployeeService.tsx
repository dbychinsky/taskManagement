import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {server} from "../../App";
import {Employee} from "../../model/Employee";
import EmployeeForm from "./EmployeeForm";

export const EmployeeService = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const initialNewEmployee = {id: '', firstName: '', lastName: '', middleName: '', position: '', fullName: ''};
    const employee = server.getEmployees().find((employee: Employee) => employee.id === id);
    const [newEmployee, setNewEmployee] = useState<Employee>(employee ? employee : initialNewEmployee);

    // Установка в состояние данных из полей формы страницы Employee
    const changeHandlerTask = (fieldName: string) => (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (newEmployee.id !== '') {
            setNewEmployee({...newEmployee, [fieldName]: e.currentTarget.value});
        } else {
            const id: string = Date.now().toString();
            setNewEmployee({...newEmployee, id, [fieldName]: e.currentTarget.value});
        }
    }

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
    }

    const onPushStorage = () => {
        // Добавление ФИО
        const newEmployees: Employee = {
            ...newEmployee,
            fullName: `${newEmployee.lastName} ${newEmployee.firstName} ${newEmployee.middleName}`
        }
        server.saveEmployee(newEmployees);
        navigate(-1);
    }

    const onCancel = () => {
        navigate(-1);
    }

    return <EmployeeForm
        newEmployee={newEmployee}
        changeHandler={changeHandlerTask}
        onPushStorage={onPushStorage}
        submitHandler={submitHandler}
        onCancel={onCancel}
    />

};
