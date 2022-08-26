import React from "react";
import {Employee} from "../../model/Employee";
import List, {ListLine} from "../List/List";
import Button from "../Button/Button";

interface IEmployeeProps {
    employees: Employee[];
    deleteEmployee: (id: string) => void,
    updateEmployee: (id: string) => void
}

export const EmployeeList = ({employees, updateEmployee, deleteEmployee}: IEmployeeProps) => {
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
                <>
                    <Button onClick={() => updateEmployee(employees.id)} text="Изменить"/>
                    <Button onClick={() => deleteEmployee(employees.id)} text="Удалить"/>
                </>
        }
    ]

    return <List listData={listData} values={employees}/>
};
