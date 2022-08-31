import React from 'react';
import {NavLink} from "react-router-dom";
import {EMPLOYEES_PAGE, PROJECTS_PAGE, TASK_PAGE} from "../../RoutersProject";
import "./Navigation.scss";

const Navigation = () => {
    return (
        <ul className="navigation">
            <li>
                <NavLink to={PROJECTS_PAGE} className="link">Проекты</NavLink>
            </li>
            <li>
                <NavLink to={TASK_PAGE} className="link">Задачи</NavLink>
            </li>
            <li>
                <NavLink to={EMPLOYEES_PAGE} className="link">Сотрудники</NavLink>
            </li>
        </ul>
    );
};

export default Navigation;
