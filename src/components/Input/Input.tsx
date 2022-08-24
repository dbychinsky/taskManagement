import React, {ChangeEventHandler, FC} from "react";
import "./Input.scss"

interface IInputProps {
    type: "text" | "number",
    value?: string | number,
    onChange: ChangeEventHandler,
    name: string
}

const Input: FC<IInputProps> = ({type, value, onChange, name}) => {

    return (
        <input
            className="inputField"
            type={type}
            value={value}
            onChange={onChange}
            name={name}
            placeholder="Введите значение"
        />
    )
}

export default Input;
