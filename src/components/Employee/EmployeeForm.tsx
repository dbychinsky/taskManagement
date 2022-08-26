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
    const [employeeList, setEmployeeList] = useState<Employee>(initialNewEmployee);

    useEffect(() => {
        const employee = server.getEmployees().find((employee: Employee) => employee.id === id);
        if (typeof id === "undefined") {
            return setEmployeeList(initialNewEmployee);
        } else {
            return setEmployeeList(employee);
        }
    }, [id])


    // Установка в state данных из input
    const changeHandler = (fieldName: string) => (e: React.KeyboardEvent<HTMLInputElement>): void => {

        if (employeeList.id !== '') {
            setEmployeeList({...employeeList, [fieldName]: e.currentTarget.value});
        } else {
            const id: string = Date.now().toString();
            setEmployeeList({...employeeList, id, [fieldName]: e.currentTarget.value});
        }

    }

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
    }

    const onPushStorage = () => {
        // Добавление ФИО
        const newEmployees: Employee = {
            ...employeeList,
            fullName: `${employeeList.lastName} ${employeeList.firstName} ${employeeList.middleName}`
        }
        server.saveEmployee(newEmployees);
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
                    <InputField type="text" value={employeeList.lastName} onChange={changeHandler('lastName')}
                                name="lastName"/>
                </div>
                <div className="formRow">
                    <Label text="Имя"/>
                    <InputField type="text" value={employeeList.firstName} onChange={changeHandler('firstName')}
                                name="firstName"/>
                </div>
                <div className="formRow">
                    <Label text="Отчество"/>
                    <InputField type="text" value={employeeList.middleName} onChange={changeHandler('middleName')}
                                name="middleName"/>
                </div>
                <div className="formRow">
                    <Label text="Позиция"/>
                    <InputField type="text" value={employeeList.position} onChange={changeHandler('position')}
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
