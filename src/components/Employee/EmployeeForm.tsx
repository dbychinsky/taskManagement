import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Employee} from "../../model/Employee";
import Label from "../Label/Label";
import Button from "../Button/Button";
import {employeeServer} from "../../server/employee/EmployeeServer";
import Input from "../Input/Input";


const EmployeeForm = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const initialNewEmployee = {id: '', firstName: '', lastName: '', middleName: '', position: '', fullName: ''};
    const [newEmployee, setNewEmployee] = useState<Employee>(initialNewEmployee);

    useEffect(() => {
        const employee = employeeServer.getEmployees().find((employee: Employee) => employee.id === id);
        if (typeof id === "undefined") {
            return setNewEmployee(initialNewEmployee);
        } else {
            return setNewEmployee(employee);
        }
    }, [id])


    // Установка в state данных из input
    const changeHandler = (fieldName: string) => (e: React.KeyboardEvent<HTMLInputElement>): void => {
        const id: string = Date.now().toString();
        setNewEmployee({...newEmployee, id, [fieldName]: e.currentTarget.value})
    }

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
    }

    const onPushStorage = () => {
        employeeServer.saveEmployee(newEmployee);
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
                    <Input type="text" value={newEmployee.lastName} onChange={changeHandler('lastName')}
                           name="lastName"/>
                </div>
                <div className="formRow">
                    <Label text="Имя"/>
                    <Input type="text" value={newEmployee.firstName} onChange={changeHandler('firstName')}
                           name="firstName"/>
                </div>
                <div className="formRow">
                    <Label text="Отчество"/>
                    <Input type="text" value={newEmployee.middleName} onChange={changeHandler('middleName')}
                           name="middleName"/>
                </div>
                <div className="formRow">
                    <Label text="Позиция"/>
                    <Input type="text" value={newEmployee.position} onChange={changeHandler('position')}
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
