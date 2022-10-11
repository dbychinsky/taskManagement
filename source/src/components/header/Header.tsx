import React, {FC} from 'react';
import './Header.scss';
import Button from "../button/Button";

/**
 * Компонент Header
 */
type IHeaderProps = {

    /**
     * Текст заголовка страницы
     */
    title: string,

    /**
     * Метод для добавления нового продукта
     * (проект, задача, сотрудник)
     */
    onClick?: () => void,

    /**
     * Текст кнопки
     */
    text?: string | null;

    /**
     * Определяет необходимость отображения кнопки
     */
    isShowButton: boolean;
}

const Header: FC<IHeaderProps> = (
    {
        title,
        onClick,
        text,
        isShowButton
    }) => {
    return (
        <header className="headerPage">
            <h1>{title}</h1>
            <div className="actionBar">
                {isShowButton &&
                    <Button onClick={onClick} text={text}/>
                }
            </div>
        </header>
    );
};

export default Header;