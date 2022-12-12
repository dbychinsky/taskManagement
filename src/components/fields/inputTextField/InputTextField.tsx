import React, {FC} from "react";
import "./InputTextField.scss"
import {IInputFieldProps} from "../IInputFIeld";

/**
 * Компонент Input(Для ввода строковых значений)
 */

/**
 * Интерфейс поля расширяется общим
 * интерфейсом IInputFieldProps
 */
type IInputTextFieldProps = IInputFieldProps & {

    /**
     * Тип поля ввода
     */
    type: "text"
}

const InputTextField: FC<IInputTextFieldProps> = (
    {
        type,
        value,
        changeHandler,
        name,
        maxLength,
        placeholder = "Введите значение"
    }) => {
    return (
        <input
            className="inputTextField"
            type={type}
            defaultValue={value}
            // onChange={changeHandler}
            onInput={changeHandler}
            name={name}
            placeholder={placeholder}
            maxLength={maxLength}
        />
    )
}

export default InputTextField;
