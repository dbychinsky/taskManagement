import React, {ChangeEventHandler, useState} from 'react';
import Button from "../Button/Button";
import InputTextField from "../Fields/InputTextField/InputTextField";
import {Employee} from "../../model/Employee";
import Header from "../Header/Header";
import FormRow from "../Form/FormRow/FormRow";

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
            label: "Фамилия:",
            field: <InputTextField
                type="text"
                value={newEmployee.lastName}
                onChange={changeHandler("lastName")}
                name={"lastName"}/>
        },
        {
            label: "Имя:",
            field: <InputTextField
                type="text"
                value={newEmployee.firstName}
                onChange={changeHandler("firstName")}
                name={"firstName"}/>
        },
        {
            label: "Отчество:",
            field: <InputTextField
                type="text"
                value={newEmployee.middleName}
                onChange={changeHandler("middleName")}
                name={"middleName"}/>
        },
        {
            label: "Должность:",
            field: <InputTextField
                type="text"
                value={newEmployee.position}
                onChange={changeHandler("position")}
                name={"position"}/>
        }
    ];
    return (
        <div className="employeeForm">
            <Header title="Сотрудник" isShowButton={false}/>
            <div className="content">
                <form onSubmit={submitHandler}>
                    {
                        fieldList.map(({label, field}, index) =>
                            <FormRow labelText={label} children={field} key={index}/>
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
