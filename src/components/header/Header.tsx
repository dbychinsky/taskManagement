import React, {FC} from 'react';
import './Header.scss';
import Button from "../button/Button";

/**
 * Компонент Header
 */

type IHeaderProps = {
    title: string,
    onClick?: () => void,
    text?: string | null;
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