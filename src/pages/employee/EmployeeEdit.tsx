import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {server} from "../../app";
import {Employee} from "../../model/Employee";
import InputTextField from "../../components/fields/inputTextField/InputTextField";
import Form, {Field, FieldError} from "../../components/form/Form";
import Header from "../../components/header/Header";
import {validator} from "../../support/util/Validator";

/**
 * Страница обновления/добавления сотрудника
 */
const EmployeeEdit = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    /**
     * Максимально допустимая длинна для поля ввода
     */
    const MAX_LENGTH: number = 50;

    /**
     * Получение данных сотрудника в случае редактирования
     */
    const [employeeEdit, setEmployeeEdit] = useState<Employee>(new Employee());

    useEffect(() => {
        server.getEmployees()
            .then(response => {
                const targetTask = response.find((employee: Employee) => employee.id === id)
                if (targetTask) {
                    setEmployeeEdit(targetTask);
                }
            })
            .catch(error => console.log(error))
    }, []);


    /**
     * Список полей для обновления/добавления сотрудника:
     *
     * name: имя поля
     * label: текстовое отображение имени поля
     * field: поле
     */
    const fieldList: Field[] = [
        {
            name: "lastName",
            label: "Фамилия:",
            field: <InputTextField
                type="text"
                value={employeeEdit.lastName}
                changeHandler={sendToStateEmployeeList}
                name={"lastName"}
                maxLength={MAX_LENGTH}
            />,
            validationList: [validator.emptyValidator]
        },
        {
            name: "firstName",
            label: "Имя:",
            field: <InputTextField
                type="text"
                value={employeeEdit.firstName}
                changeHandler={sendToStateEmployeeList}
                name={"firstName"}
                maxLength={MAX_LENGTH}
            />,
            validationList: [validator.emptyValidator]
        },
        {
            name: "middleName",
            label: "Отчество:",
            field: <InputTextField
                type="text"
                value={employeeEdit.middleName}
                changeHandler={sendToStateEmployeeList}
                name={"middleName"}
                maxLength={MAX_LENGTH}
            />,
            validationList: [validator.emptyValidator]
        },
        {
            name: "position",
            label: "Должность:",
            field: <InputTextField
                type="text"
                value={employeeEdit.position}
                changeHandler={sendToStateEmployeeList}
                name={"position"}
                maxLength={MAX_LENGTH}
            />,
            validationList: [validator.emptyValidator]
        }
    ];

    /**
     * Метод для установки в состояние данных из полей формы
     */
    function sendToStateEmployeeList(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
        setEmployeeEdit({...employeeEdit, [e.target.name]: e.target.value});
    }

    /**
     * Метод отмены
     */
    const cancel = () => {
        navigate(-1);
    };

    /**
     * Формирование списка ошибок на основе полей формы
     * и добавление их в состояние
     */
    const [fieldErrorList, setFieldErrorList] = useState<FieldError[]>(
        fieldList.map(elem => {
            return {field: elem.field.props.name, message: ''}
        }));

    /**
     * Метод для добавления сотрудника, вызываемый при нажатии кнопки "Сохранить"
     * если все поля формы валидны, формируем ФИО и отправляем данные на сервер
     */
    const save = () => {
        const errorList = validator.validateFields(fieldList);
        setFieldErrorList(errorList);
        if (!errorList.length) {
            const newEmployees: Employee = {
                ...employeeEdit,
                fullName: `${employeeEdit.lastName} ${employeeEdit.firstName} ${employeeEdit.middleName}`
            }
            server.saveEmployee(newEmployees).then(() => {
                navigate(-1)
            })
        }
    };

    return (
        <div className="EmployeeForm">
            <Header title="Сотрудник" isShowButton={false}/>
            <div className="content">
                <Form fieldList={fieldList}
                      fieldErrorList={fieldErrorList}
                      onSubmitForm={save}
                      onCancel={cancel}/>
            </div>
        </div>
    );
};

export default EmployeeEdit;