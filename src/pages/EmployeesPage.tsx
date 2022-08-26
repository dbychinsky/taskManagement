import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Employee} from "../model/Employee";
import {EmployeeList} from "../components/Employee/EmployeeList";
import {buildUpdateEmployeePath, EMPLOYEE_FORM} from "../Paths";
import {server} from "../App";
import Header from "../components/Header/Header";

const EmployeesPage = () => {
    const navigate = useNavigate();
    const [employeeList, setEmployeeList] = useState<Employee[]>([]);


    useEffect(() => {
        setEmployeeList(server.getEmployees());
    }, []);

    const addEmployee = () => {
        navigate(EMPLOYEE_FORM)
    }

    const deleteEmployee = (id: string) => {
        server.deleteEmployee(id);
        setEmployeeList(server.getEmployees());
    }

    const updateEmployee = (id: string) => {
        navigate(buildUpdateEmployeePath(id!));
    }

    return (
        <div className="employeePage">
            <Header
                title="Список сотрудников"
                onClick={addEmployee}
                text="Добавить"
                isShowButton={true}/>
            <EmployeeList
                employees={employeeList}
                deleteEmployee={deleteEmployee}
                updateEmployee={updateEmployee}/>
        </div>
    );
};

export default EmployeesPage;