import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {server} from "../../app";
import {Employee} from "../../model/Employee";
import InputTextField from "../../components/fields/inputTextField/InputTextField";
import {ErrorList, FieldList} from "../../support/typeListForAllApp";
import Form, {FormFeedback} from "../../components/form/Form";
import Header from "../../components/header/Header";
import {validate} from "../../support/util/validate";

/**
 * Страница обновления/добавления сотрудника
 */

const EmployeeEdit = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    /**
     * Получение данных сотрудника в случае редактирования
     */
    const initialEmployee = server.getEmployees().find((employee: Employee) => employee.id === id);
    /**
     * Список сотрудников
     */
    const [employee, setEmployee] = useState<Employee>(initialEmployee ? initialEmployee : new Employee());
    /**
     * Максимально допустимая длинна для поля ввода
     */
    const MAX_LENGTH: number = 50;

    /**
     * Список полей для обновления/добавления сотрудника:
     * name: имя поля
     * label: текстовое отображение имени поля
     * field: поле
     */
    const fieldList: FieldList[] = [
        {
            name: "lastName",
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
            name: "firstName",
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
            name: "middleName",
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
            name: "position",
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

    /**
     * Метод для формирования списка ошибок на основе полей формы
     * и добавление их в состояние
     */
    const [errorList, setErrorList] = useState<ErrorList[]>(
        fieldList.map(elem => {
            return {name: elem.field.props.name, isValid: true, errorMessage: ''}
        }));

    /**
     * Список информационных сообщений для всей формы (ошибок)
     */
    const [feedBackFormList, setFeedBackFormList] = useState<FormFeedback[]>([{
        isValid: true,
        errorMessage: ''
    }]);

    /**
     * Метод для установки в состояние данных из полей формы
     */
    function sendToStateEmployeeList(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
        // Добавление id если отстутсвует
        if (!employee.id) {
            const id: string = Date.now().toString();
            employee.id = id
        }
        setEmployee({...employee, [e.target.name]: e.target.value});
    };

    /**
     * Метод отмены
     */
    const cancel = () => {
        navigate(-1);
    };

    /**
     * Метод для добавления сотрудника, вызываемый при нажатии кнопки "Сохранить",
     * если все поля формы валидны, формируем ФИО и отправляем данные на сервер
     */
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
                      onCancel={cancel}/>
            </div>
        </div>
    );
};

export default EmployeeEdit;