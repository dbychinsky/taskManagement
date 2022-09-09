import React, {useEffect, useState} from 'react';
import Header from "../Header/Header";
import InputTextField from "../Fields/InputTextField/InputTextField";
import {Employee} from "../../model/Employee";
import Form from "../Form/Form";
import {ErrorFieldState, validation} from "../../util/validation/validateService";

interface IProjectFormProps {
    employee: Employee,
    onPushStorage: () => void,
    onCancel: () => void,
    changeHandlerEmployee: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export type FieldListForm = {
    label: string,
    field: JSX.Element,
    message: string
}


const EmployeeForm = (props: IProjectFormProps) => {
    const {
        employee,
        onPushStorage,
        onCancel,
        changeHandlerEmployee
    } = props

    const fieldList: FieldListForm[] = [
        {
            label: "Фамилия:",
            field: <InputTextField
                type="text"
                value={employee.lastName}
                changeHandler={changeHandlerEmployee}
                name={"lastName"}
                required={true}/>,
            message: ''
        },
        {
            label: "Имя:",
            field: <InputTextField
                type="text"
                value={employee.firstName}
                changeHandler={changeHandlerEmployee}
                name={"firstName"}
                required={true}/>,
            message: ''

        },
        {
            label: "Отчество:",
            field: <InputTextField
                type="text"
                value={employee.middleName}
                changeHandler={changeHandlerEmployee}
                name={"middleName"}
                required={true}/>,
            message: ''
        },
        {
            label: "Должность:",
            field: <InputTextField
                type="text"
                value={employee.position}
                changeHandler={changeHandlerEmployee}
                name={"position"}
                required={false}/>,
            message: ''
        }
    ];

    const fieldFieldStateError: ErrorFieldState[] =
        [
            {name: "lastName", isValid: false},
            {name: "firstName", isValid: false},
            {name: "middleName", isValid: false}
        ];


    const [fieldListForm, setFieldListForm] = useState<FieldListForm[]>(fieldList);


    useEffect(() => {
        setFieldListForm(fieldList);
    }, [changeHandlerEmployee])


    const validationField = () => {
        setFieldListForm(validation(fieldFieldStateError, fieldList));
    }

    const isValidForm = (fieldFieldStateError: ErrorFieldState[]): boolean => {
        return typeof (fieldFieldStateError.find(element => element.isValid == false)) == 'undefined'
    }

    const onSubmitForm = () => {
        validationField();
        if (isValidForm(fieldFieldStateError)) {
            onPushStorage();
        } else {
            console.log('ne go')
        }
    }

    return (
        <div className="EmployeeForm">
            <Header title="Сотрудник" isShowButton={false}/>
            <div className="content">
                <Form fieldListForm={fieldListForm} onSubmitForm={onSubmitForm} onCancel={onCancel}/>
            </div>
        </div>
    );
};

export default EmployeeForm;
