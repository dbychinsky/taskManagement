import React from 'react';
import './Header.scss';
import Button from "../Button/Button";

interface IHeader {
    title: string,
    onClick?: () => void,
    text?: string | null;
    isShowButton: boolean;
}

const Header = ({title, onClick, text, isShowButton}: IHeader) => {
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