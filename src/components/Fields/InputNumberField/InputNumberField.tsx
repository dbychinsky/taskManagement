import React, {FC} from "react";
import "./InputNumberField.scss"
import {IInputFieldProps} from "../IInputFIeld";

interface IInputNumberField extends IInputFieldProps {
    type: "text",
    isValidNumberPositive?: boolean
}

const InputNumberField: FC<IInputNumberField> = (
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
