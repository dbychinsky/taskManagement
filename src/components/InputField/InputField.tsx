import React, {ChangeEventHandler, FC} from "react";
import "./InputField.scss"

interface IInputFieldProps {
    type: "text" | "number",
    value?: string | number,
    onChange: ChangeEventHandler,
    name: string
}

const InputField: FC<IInputFieldProps> = ({type, value, onChange, name}) => {

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

export default InputField;
