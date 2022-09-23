import React, {FC} from "react";
import "./InputNumberField.scss"
import {IInputFieldProps} from "../IInputFIeld";

/**
 * Компонент Input(Number)
 */

type IInputNumberFieldProps = IInputFieldProps & {
    type: "text",
    isValidNumberPositive?: boolean
}

const InputNumberField: FC<IInputNumberFieldProps> = (
    {
        type,
        value,
        changeHandler,
        name,
        placeholder = "Введите значение",
        required,
        isValidNumberPositive
    }) => {
    return (
        <input
            className="inputNumberField"
            type={type}
            defaultValue={value}
            onChange={changeHandler}
            name={name}
            placeholder={placeholder}
            maxLength={50}
            min="1"
        />
    )
}

export default InputNumberField;
