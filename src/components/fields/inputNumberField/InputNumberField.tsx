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
    /**
     * Определяет необходимость валидации поля на содержание
     * только чисел
     */
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
