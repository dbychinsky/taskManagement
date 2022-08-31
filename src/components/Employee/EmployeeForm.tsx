import React, {ChangeEventHandler, useState} from 'react';
import Button from "../Button/Button";
import InputTextField from "../InputTextField/InputTextField";
import {Employee} from "../../model/Employee";
import Header from "../Header/Header";

interface IEmployeeFormProps {
    newEmployee: Employee,
    changeHandler: (fieldName: string) => ChangeEventHandler,
    submitHandler: (event: React.FormEvent) => void,
    onPushStorage: () => void,
    onCancel: () => void,
}


const EmployeeForm = (props: IEmployeeFormProps) => {
    const {
        newEmployee,
        changeHandler,
        submitHandler,
        onPushStorage,
        onCancel
    } = props

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
            <Header title="Сотрудник" isShowButton={false}/>
            <div className="content">
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
        </div>
    );
};

export default EmployeeForm;
