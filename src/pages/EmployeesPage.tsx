import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Employee} from "../model/Employee";
import {employeeServer} from "../server/employee/EmployeeServer";
import Button from "../components/Button/Button";
import {EmployeeList} from "../components/Employee/EmployeeList";
import {buildUpdateEmployeePath, EMPLOYEE_FORM} from "../Paths";

const EmployeesPage = () => {
    const [employees, setEmployee] = useState<Employee[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        setEmployee(employeeServer.getEmployees());
    }, []);

    const addEmployee = () => {
        navigate(EMPLOYEE_FORM)
    }

    const deleteEmployee = (id: string) => {
        employeeServer.deleteEmployee(id);
        setEmployee(employeeServer.getEmployees());
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