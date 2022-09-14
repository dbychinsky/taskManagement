import React, {useEffect, useState} from 'react';
import Header from "../Header/Header";
import InputTextField from "../Fields/InputTextField/InputTextField";
import {Employee} from "../../model/Employee";
import Form from "../Form/Form";

export type ErrorFieldState = {
    name: string,
    isValid: boolean
}

interface IProjectFormProps {
    employee: Employee,
    onPushStorage: () => void,
    onCancel: () => void,
    changeHandlerEmployee: (e: React.ChangeEvent<HTMLInputElement>) => void,
}


const EmployeeForm = (props: IProjectFormProps) => {
    const {
        employee,
        onPushStorage,
        onCancel,
        changeHandlerEmployee
    } = props

    const fieldList = [
        {
            label: "Фамилия:",
            field: <InputTextField
                type="text"
                value={employee.lastName}
                changeHandler={changeHandlerEmployee}
                name={"lastName"}
                required={true}
                isValidLetterPositive={true}/>,
            message: ''
        },
        {
            label: "Имя:",
            field: <InputTextField
                type="text"
                value={employee.firstName}
                changeHandler={changeHandlerEmployee}
                name={"firstName"}
                required={true}
                isValidLetterPositive={true}/>,
            message: ''

        },
        {
            label: "Отчество:",
            field: <InputTextField
                type="text"
                value={employee.middleName}
                changeHandler={changeHandlerEmployee}
                name={"middleName"}
                required={true}
                isValidLetterPositive={true}/>,
            message: ''
        },
        {
            label: "Должность:",
            field: <InputTextField
                type="text"
                value={employee.position}
                changeHandler={changeHandlerEmployee}
                name={"position"}
                required={true}
                isValidLetterPositive={true}/>,
            message: ''
        }
    ];

    // const onSubmitForm = () => {
    //         onPushStorage();
    // }

    return (
        <div className="EmployeeForm">
            <Header title="Сотрудник" isShowButton={false}/>
            <div className="content">
                <Form fieldList={fieldList}
                      onPushStorage={onPushStorage}
                      onCancel={onCancel}/>
            </div>
        </div>
    );
};

export default EmployeeForm;
