import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {server} from "../../app";
import {Employee} from "../../model/Employee";
import InputTextField from "../../components/fields/inputTextField/InputTextField";
import {ErrorList} from "../../support/type";
import Form, {FormFeedback} from "../../components/form/Form";
import Header from "../../components/header/Header";
import {validate} from "../../support/util/validate";

const EmployeeEdit = () => {

    const navigate = useNavigate();
    const {id} = useParams();

    const initialEmployee = server.getEmployees().find((employee: Employee) => employee.id === id);
    const [employee, setEmployee] = useState<Employee>(initialEmployee ? initialEmployee : new Employee());

    const MAX_LENGTH: number = 50;
    const fieldList = [
        {
            label: "Фамилия:",
            field: <InputTextField
                type="text"
                value={employee.lastName}
                changeHandler={sendToStateEmployeeList}
                name={"lastName"}
                maxLength={MAX_LENGTH}
                required={true}
            />
        },
        {
            label: "Имя:",
            field: <InputTextField
                type="text"
                value={employee.firstName}
                changeHandler={sendToStateEmployeeList}
                name={"firstName"}
                maxLength={MAX_LENGTH}
                required={true}
            />

        },
        {
            label: "Отчество:",
            field: <InputTextField
                type="text"
                value={employee.middleName}
                changeHandler={sendToStateEmployeeList}
                name={"middleName"}
                maxLength={MAX_LENGTH}
                required={true}
            />
        },
        {
            label: "Должность:",
            field: <InputTextField
                type="text"
                value={employee.position}
                changeHandler={sendToStateEmployeeList}
                name={"position"}
                maxLength={MAX_LENGTH}
                required={true}
            />
        }
    ];

    // Формируем список ошибок на основе списка полей формы
    const [errorList, setErrorList] = useState<ErrorList[]>(
        fieldList.map(elem => {
            return {name: elem.field.props.name, isValid: true, errorMessage: ''}
        }));

    const [feedBackFormList, setFeedBackFormList] = useState<FormFeedback[]>([{
        isValid: true,
        errorMessage: ''
    }]);

    // Установка в состояние данных из полей формы страницы task
    function sendToStateEmployeeList(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
        if (!employee.id) {
            const id: string = Date.now().toString();
            employee.id = id
        }
        setEmployee({...employee, [e.target.name]: e.target.value});
    };

    // Отмена
    const onCancel = () => {
        navigate(-1);
    };

    const save = () => {
        // Валидация полей формы
        const isValidFormField = validate.validateField(fieldList, errorList)
        setErrorList(isValidFormField => [...isValidFormField]);

        if (validate.isValidForm(errorList)) {
            // Добавление ФИО
            const newEmployees: Employee = {
                ...employee,
                fullName: `${employee.lastName} ${employee.firstName} ${employee.middleName}`
            }
            server.saveEmployee(newEmployees);
            navigate(-1);

        }
    }

    return (
        <div className="EmployeeForm">
            <Header title="Сотрудник" isShowButton={false}/>
            <div className="content">
                <Form fieldList={fieldList}
                      feedBackForm={feedBackFormList}
                      errorList={errorList}
                      onSubmitForm={save}
                      onCancel={onCancel}/>
            </div>
        </div>
    );
};

export default EmployeeEdit;