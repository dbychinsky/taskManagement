import config from '../../configApp.json';
import React from 'react';
import "./MainPage.scss";

/**
 * Начальная страница.
 */
const MainPage = () => {
    return (
        <div className="mainPage">
            <h1>Тренировочный проект: Управление задачами</h1>
            <p>Подключен {config.server}</p>
        </div>
    );
};

export default MainPage;
