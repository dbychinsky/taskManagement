import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Employee} from "../../model/Employee";
import {server} from "../../app";
import Header from "../../components/header/Header";
import {EMPLOYEES_FORM_PATH} from "../../routersProject";
import List, {ListData} from "../../components/list/List";
import Button from "../../components/button/Button";

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