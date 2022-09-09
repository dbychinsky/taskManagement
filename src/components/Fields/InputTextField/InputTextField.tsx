import React, {FC} from "react";
import "./InputTextField.scss"
import {IInputFieldProps} from "../IInputFIeld";

interface IInputTextField extends IInputFieldProps {
    type: "text",
    isValidLetterPositive?: boolean
}

const InputTextField: FC<IInputTextField> = (
    {
        type,
        value,
        changeHandler,
        name,
        placeholder = "Введите значение",
        required
    }) => {
    return (
        <input
            className="inputTextField"
            type={type}
            defaultValue={value}
            onChange={changeHandler}
            name={name}
            placeholder={placeholder}
            maxLength={50}
        />
    )
}

export default InputTextField;
