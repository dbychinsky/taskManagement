import React, {ChangeEventHandler, FC} from "react";
import "./InputTextField.scss"

interface IInputFieldProps {
    type: "text" | "number",
    value?: string | number,
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
    name: string,
    placeholder?: string,
    required?: boolean
}

const InputTextField: FC<IInputFieldProps> = (
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
            min="0"
        />
    )
}

export default InputTextField;
