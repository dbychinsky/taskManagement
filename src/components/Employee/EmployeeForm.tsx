import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Employee} from "../../model/Employee";
import Button from "../Button/Button";
import InputTextField from "../InputTextField/InputTextField";
import {server} from "../../App";

const EmployeeForm = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const initialNewEmployee = {id: '', firstName: '', lastName: '', middleName: '', position: '', fullName: ''};
    const employee = server.getEmployees().find((employee: Employee) => employee.id === id);
    const [newEmployee, setNewEmployee] = useState<Employee>(employee ? employee : initialNewEmployee);

    // Установка в state данных из input
    const changeHandler = (fieldName: string) => (e: React.KeyboardEvent<HTMLInputElement>): void => {
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

    const fieldList = [
        {
            label: "Имя:",
            name: "firstName",
            value: newEmployee.firstName

        },
        {
            label: "Отчество:",
            name: "middleName",
            value: newEmployee.middleName
        },
        {
            label: "Фамилия:",
            name: "lastName",
            value: newEmployee.lastName
        },
        {
            label: "Описание проекта:",
            name: "position",
            value: newEmployee.position
        }
    ];
    return (
        <div className="employeeForm">
            <form onSubmit={submitHandler}>
                {
                    fieldList.map(({label, name, value}, index) =>
                        <div className="formRow" key={index}>
                            <label>{label}</label>
                            <InputTextField
                                type="text"
                                value={value}
                                onChange={changeHandler(name)}
                                name={name}/>
                        </div>
                    )
                }
                <div className="actionBar">
                    <Button onClick={onPushStorage} text="Сохранить"/>
                    <Button onClick={onCancel} text="Отмена"/>
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;
