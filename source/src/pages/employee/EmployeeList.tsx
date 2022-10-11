import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Employee} from "../../model/Employee";
import {server} from "../../app";
import Header from "../../components/header/Header";
import {EMPLOYEES_FORM_PATH} from "../../routerList";
import List, {ListData} from "../../components/list/List";
import Button from "../../components/button/Button";

/**
 * Страница со списком сотрудников
 */
const EmployeeList = () => {

    const navigate = useNavigate();

    /**
     * Список сотрудников
     */
    const [employeeList, setEmployeeList] = useState<Employee[]>([]);
    useEffect(() => {
        getEmployeeList();
    }, []);


    /**
     * Метод для добавления сотрудника, вызываемый при нажатии кнопки "Добавить",
     * переход к странице обновления/добавления
     */
    const add = () => {
        navigate(EMPLOYEES_FORM_PATH)
    };

    /**
     * Метод для удаления сотрудника, вызываемый при нажатии кнопки "удалить"
     *
     * @param id идентификатор сотрудника
     */
    const remove = (id: string) => {
        server.deleteEmployee(id)
            .then(() => getEmployeeList())
            .catch(error => console.log(error))
    };

    /**
     * Метод для обновления сотрудника, вызываемый при нажатии кнопки "изменить",
     * переход к странице обновления/добавления
     *
     * @param id идентификатор сотрудника
     */
    const update = (id: string) => {
        navigate(id);
    };

    /**
     * Функция установки в состояние списка сотрудников
     */
    function getEmployeeList() {
        server.getEmployees()
            .then(response => setEmployeeList(response))
            .catch(error => console.log(error))
    }

    /**
     * Список полей для отображения:
     *
     * name: имя поля
     * label: тестовое отображение имени поля
     * getValueList: метод получения данных для отображения в строке
     */
    const listData: ListData<Employee>[] = [
        {
            name: "lastName",
            label: "Фамилия:",
            getValueList: (employee) => employee.lastName
        },
        {
            name: "firstName",
            label: "Имя:",
            getValueList: (employee) => employee.firstName
        },
        {
            name: "middleName",
            label: "Отчество:",
            getValueList: (employee) => employee.middleName
        },
        {
            name: "position",
            label: "Должность:",
            getValueList: (employee) => employee.position
        },
        {
            name: "actionBar",
            label: "",
            getValueList: (employee) =>
                <div className="actionBar">
                    <Button onClick={() => update(employee.id)} text="Изменить"/>
                    <Button onClick={() => remove(employee.id)} text="Удалить"/>
                </div>
        }
    ];

    return (
        <div className="employeePage">
            <Header
                title="Список сотрудников"
                onClick={add}
                text="Добавить"
                isShowButton={true}/>

            <List listData={listData} values={employeeList}/>
        </div>
    );
};

export default EmployeeList;