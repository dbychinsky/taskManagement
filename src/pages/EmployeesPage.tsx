import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Employee} from "../model/Employee";
import {EmployeeList} from "../components/Employee/EmployeeList";
import {EMPLOYEE_FORM} from "../RoutersProject";
import {server} from "../App";
import Header from "../components/Header/Header";

const EmployeesPage = () => {
    const navigate = useNavigate();
    const [employeeList, setEmployeeList] = useState<Employee[]>([]);

    useEffect(() => {
        setEmployeeList(server.getEmployees());
    }, []);

    const add = () => {
        navigate(EMPLOYEE_FORM)
    };

    const remove = (id: string) => {
        server.deleteEmployee(id);
        setEmployeeList(server.getEmployees());
    };

    const update = (id: string) => {
        navigate(id);
    };

    return (
        <div className="employeePage">
            <Header
                title="Список сотрудников"
                onClick={add}
                text="Добавить"
                isShowButton={true}/>

            <EmployeeList
                employees={employeeList}
                remove={remove}
                update={update}/>
        </div>
    );
};

export default EmployeesPage;