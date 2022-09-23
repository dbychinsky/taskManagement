import React, {FC} from "react";
import "./Button.scss"

/**
 * Компонент Button
 */

type IButtonProps = {
    // Функция срабатывающая при клике на кнопку, если не указана, будет пустой функцией
    onClick: (e?: any) => void;
    text?: string;
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
