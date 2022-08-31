import React, {ChangeEventHandler, FC} from "react";
import "./InputTextField.scss"

interface IInputFieldProps {
    type: "text" | "number",
    value?: string | number,
    onChange: ChangeEventHandler,
    name: string,
    placeholder?: string
}

const InputTextField: FC<IInputFieldProps> = (
    {
        type,
        value,
        onChange,
        name,
        placeholder = "Введите значение"
    }) => {
    return (
        <input
            className="inputTextField"
            type={type}
            defaultValue={value}
            onChange={onChange}
            name={name}
            placeholder={placeholder}
        />
    )
}

export default InputTextField;
