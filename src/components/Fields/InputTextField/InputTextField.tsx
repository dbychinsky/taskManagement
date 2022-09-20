import React, {FC} from "react";
import "./InputTextField.scss"
import {IInputFieldProps} from "../IInputFIeld";

/**
 * Компонент Input(String)
 */


interface IInputTextFieldProps extends IInputFieldProps {
    type: "text",
    isValidLetterPositive?: boolean,
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
            onChange={changeHandler}
            name={name}
            placeholder={placeholder}
            maxLength={maxLength}
        />
    )
}

export default InputTextField;
