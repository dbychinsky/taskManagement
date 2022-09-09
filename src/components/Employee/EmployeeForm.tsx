import React, {useEffect, useState} from 'react';
import Header from "../Header/Header";
import InputTextField from "../Fields/InputTextField/InputTextField";
import {Employee} from "../../model/Employee";
import {isValidEmptyField, isValidEmptyFieldText} from "../../Validate";
import Form, {FieldListForm} from "../Form/Form";

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

    const fieldFieldStateError =
        [
            {name: "lastName", isValid: false},
            {name: "firstName", isValid: false},
            {name: "middleName", isValid: false}
        ];

    const [fieldListForm, setFieldListForm] = useState<FieldListForm[]>(fieldList);

    useEffect(() => {
        setFieldListForm(fieldList);

        // validationField();
    }, [employee])

    const validationField = () => {

        const changeFieldListErrors = (name: string, isValid: boolean) => {
            fieldFieldStateError.forEach((element) => {
                if (element.name === name) {
                    element.isValid = isValid;
                }
            });
        }

        setFieldListForm(fieldList.map((fields) => {

                let fieldTemp = fields.field.props;

                if (fields.field.props.required) {
                    if (isValidEmptyField(fields.field.props.value)) {
                        fields.message = ''
                        console.log('Поле валидно.', fields.message);
                        changeFieldListErrors(fieldTemp.name, true);


                    } else {
                        fields.message = isValidEmptyFieldText;
                        console.log('Поле не валидно.', fields.message);
                        changeFieldListErrors(fieldTemp.name, false);

                    }
                }
                return fields
            }
        ))

    };

    const isValidForm = (fieldFieldStateError: ErrorFieldState[]): boolean => {
        return typeof (fieldFieldStateError.find(element => element.isValid == false)) == 'undefined'
    }

    const onSubmitForm = () => {

        validationField();

        if (isValidForm(fieldFieldStateError)) {
            onPushStorage();
        } else {
            console.log('form is not valid')
        }
    }

    return (
        <div className="EmployeeForm">
            <Header title="Сотрудник" isShowButton={false}/>
            <div className="content">
                <Form fieldListForm={fieldListForm}
                      onSubmitForm={onSubmitForm}
                      onCancel={onCancel}/>
            </div>
        </div>
    );
};

export default EmployeeForm;
