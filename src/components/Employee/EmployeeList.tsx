import React from "react";
import {Employee} from "../../model/Employee";
import List, {ListLine} from "../List/List";
import Button from "../Button/Button";

interface IEmployeeProps {
    employee: Employee[];
    deleteEmployee: (id: string) => void,
    updateEmployee: (id: string) => void
}

export const EmployeeList = ({employee, updateEmployee, deleteEmployee}: IEmployeeProps) => {
    const listData: ListLine<Employee>[] = [
        {
            listName: "Фамилия:",
            getValueListLine: (employee) => employee.lastName
        },
        {
            listName: "Имя:",
            getValueListLine: (employee) => employee.firstName
        },
        {
            listName: "Отчество:",
            getValueListLine: (employee) => employee.middleName
        },
        {
            listName: "Должность:",
            getValueListLine: (employee) => employee.position
        },
        {
            listName: "",
            getValueListLine: (employee) =>
                <>
                    <Button onClick={() => updateEmployee(employee.id)} text="Изменить"/>
                    <Button onClick={() => deleteEmployee(employee.id)} text="Удалить"/>
                </>
        }
    ]

    return <List listData={listData} values={employee}/>
};
