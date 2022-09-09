import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Employee} from "../model/Employee";
import {EmployeeView} from "../components/Employee/EmployeeView";
import {server} from "../App";
import Header from "../components/Header/Header";
import {EmployeesFormPath} from "../RoutersProject";

const EmployeesPage = () => {
    const navigate = useNavigate();
    const [employeeList, setEmployeeList] = useState<Employee[]>([]);

    useEffect(() => {
        setEmployeeList(server.getEmployees());
    }, []);

    const add = () => {
        navigate(EmployeesFormPath)
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

            <EmployeeView
                employees={employeeList}
                remove={remove}
                update={update}/>
        </div>
    );
};

export default EmployeesPage;