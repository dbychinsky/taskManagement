import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Employee} from "../../model/Employee";
import Label from "../Label/Label";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import {server} from "../../App";


const EmployeeForm = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    const initialNewEmployee = {id: '', firstName: '', lastName: '', middleName: '', position: '', fullName: ''};

    const [employees, setEmployee] = useState<Employee>(initialNewEmployee);

    useEffect(() => {
        const employee = server.getEmployees().find((employee: Employee) => employee.id === id);
        if (typeof id === "undefined") {
            return setEmployee(initialNewEmployee);
        } else {
            return setEmployee(employee);
        }
    }, [id])


    // Установка в state данных из input
    const changeHandler = (fieldName: string) => (e: React.KeyboardEvent<HTMLInputElement>): void => {
        const id: string = Date.now().toString();
        setEmployee({...employees, id, [fieldName]: e.currentTarget.value})
    }

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
    }

    const onPushStorage = () => {
        // Добавление ФИО
        const newEmployee: Employee = {
            ...employees,
            fullName: `${employees.lastName} ${employees.firstName} ${employees.middleName}`
        }
        server.saveEmployee(newEmployee);
        navigate(-1);
    }

    const onCancel = () => {
        navigate(-1);
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className="formRow">
                    <Label text="Фамилия"/>
                    <InputField type="text" value={employees.lastName} onChange={changeHandler('lastName')}
                                name="lastName"/>
                </div>
                <div className="formRow">
                    <Label text="Имя"/>
                    <InputField type="text" value={employees.firstName} onChange={changeHandler('firstName')}
                                name="firstName"/>
                </div>
                <div className="formRow">
                    <Label text="Отчество"/>
                    <InputField type="text" value={employees.middleName} onChange={changeHandler('middleName')}
                                name="middleName"/>
                </div>
                <div className="formRow">
                    <Label text="Позиция"/>
                    <InputField type="text" value={employees.position} onChange={changeHandler('position')}
                                name="position"/>
                </div>

                <div className="actionBar">
                    <Button onClick={onPushStorage} text="Сохранить"/>
                    <Button onClick={onCancel} text="Отмена"/>
                </div>

            </form>
        </div>
    );
};

export default EmployeeForm;
