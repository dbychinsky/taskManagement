import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Employee} from "../../model/Employee";
import {server} from "../../App";
import Header from "../../components/Header/Header";
import {EMPLOYEES_FORM_PATH} from "../../RoutersProject";
import List, {ListLine} from "../../components/List/List";
import Button from "../../components/Button/Button";

const EmployeeList = () => {
    const navigate = useNavigate();
    const [employeeList, setEmployeeList] = useState<Employee[]>([]);

    useEffect(() => {
        setEmployeeList(server.getEmployees());
    }, []);

    const add = () => {
        navigate(EMPLOYEES_FORM_PATH)
    };

    const remove = (id: string) => {
        server.deleteEmployee(id);
        setEmployeeList(server.getEmployees());
    };

    const update = (id: string) => {
        navigate(id);
    };

    const listData: ListLine<Employee>[] = [
        {
            listName: "Фамилия:",
            getValueListLine: (employees) => employees.lastName
        },
        {
            listName: "Имя:",
            getValueListLine: (employees) => employees.firstName
        },
        {
            listName: "Отчество:",
            getValueListLine: (employees) => employees.middleName
        },
        {
            listName: "Должность:",
            getValueListLine: (employees) => employees.position
        },
        {
            listName: "",
            getValueListLine: (employees) =>
                <div className="actionBar">
                    <Button onClick={() => update(employees.id)} text="Изменить"/>
                    <Button onClick={() => remove(employees.id)} text="Удалить"/>
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