import React from 'react';
import {NavLink} from "react-router-dom";
import {EMPLOYEES_PAGE_PATH, PROJECT_PAGE_PATH, TASK_PAGE_PATH} from "../../routerList";
import "./Navigation.scss";

/**
 * Компонент Navigation, список страниц в проекте
 */
const Navigation = () => {
    return (
        <ul className="navigation">
            <li>
                <NavLink to={PROJECT_PAGE_PATH} className="link">Проекты</NavLink>
            </li>
            <li>
                <NavLink to={TASK_PAGE_PATH} className="link">Задачи</NavLink>
            </li>
            <li>
                <NavLink to={EMPLOYEES_PAGE_PATH} className="link">Сотрудники</NavLink>
            </li>
        </ul>
    );
};

export default Navigation;
