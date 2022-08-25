import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Employee} from "../model/Employee";
import Button from "../components/Button/Button";
import {EmployeeList} from "../components/Employee/EmployeeList";
import {buildUpdateEmployeePath, EMPLOYEE_FORM} from "../Paths";
import {server} from "../App";

const EmployeesPage = () => {
    const [employees, setEmployee] = useState<Employee[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        setEmployee(server.getEmployees());
    }, []);

    const addEmployee = () => {
        navigate(EMPLOYEE_FORM)
    }

    const deleteEmployee = (id: string) => {
        server.deleteEmployee(id);
        setEmployee(server.getEmployees());
    }

    const updateEmployee = (id: string) => {
        navigate(buildUpdateEmployeePath(id!));
    }

    return (
        <div className="employeePage">

            <div className="actionBar">
                <Button onClick={addEmployee} text={"Добавить"}/>
            </div>

            <EmployeeList employee={employees} deleteEmployee={deleteEmployee} updateEmployee={updateEmployee}/>
        </div>
    );
};

export default EmployeesPage;