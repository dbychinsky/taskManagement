import React, {FC} from "react";
import "./Button.scss"

/**
 * Компонент Button
 */

type IButtonProps = {
    /**
     * Метод вызываемый при клике на кнопку
     */
    onClick: (e?: any) => void;
    /**
     * Текст внутри кнопки
     */
    text?: string;
    /**
     * Атрибут для определения доступности кнопки для нажатия
     */
    disabled?: boolean;
}

const Button: FC<IButtonProps> = ({onClick, text, disabled}) => {
    return (
        <button className="button"
                type="button"
                disabled={disabled}
                onClick={onClick}>{text}
        </button>
    )
}

export default Button;
