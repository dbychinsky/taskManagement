import React from 'react';
import {NavLink} from "react-router-dom";
import "./Navigation.scss";
import {EmployeesPagePath, ProjectPagePath, TaskPagePath} from "../../RoutersProject";

const Navigation = () => {
    return (
        <ul className="navigation">
            <li>
                <NavLink to={ProjectPagePath} className="link">Проекты</NavLink>
            </li>
            <li>
                <NavLink to={TaskPagePath} className="link">Задачи</NavLink>
            </li>
            <li>
                <NavLink to={EmployeesPagePath} className="link">Сотрудники</NavLink>
            </li>
        </ul>
    );
};

export default Navigation;
