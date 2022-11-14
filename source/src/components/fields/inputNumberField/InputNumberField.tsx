import React, {FC} from "react";
import {IInputFieldProps} from "../IInputFIeld";
import "./InputNumberField.scss"

/**
 * Компонент Input(Для ввода числовых значений)
 */

/**
 * Интерфейс поля расширяется общим
 * интерфейсом IInputFieldProps
 */
type IInputNumberFieldProps = IInputFieldProps & {

    /**
     * Тип поля ввода
     */
    type: "text",
}

const InputNumberField: FC<IInputNumberFieldProps> = (
    {
        type,
        value,
        changeHandler,
        name,
        placeholder = "Введите значение"
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
