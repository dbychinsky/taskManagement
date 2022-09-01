import React from "react";
import {Employee} from "../../model/Employee";
import List, {ListLine} from "../List/List";
import Button from "../Button/Button";

interface IEmployeeProps {
    employees: Employee[];
    update: (id: string) => void,
    remove: (id: string) => void
}

export const EmployeeList = ({employees, update, remove}: IEmployeeProps) => {
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
    ]

    return <List listData={listData} values={employees}/>
};
