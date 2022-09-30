import React from "react";

/**
 * Общий интерфейс для работы с input
 */

export type IInputFieldProps = {
    /**
     * Значение в поле ввода
     */
    value?: string | number,
    /**
     * Метод, вызываемый при изменении значения в поле ввода
     *
     * @param e новое значение
     */
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
    /**
     * Имя поля
     */
    name: string,
    /**
     * Подсказка в поле ввода
     */
    placeholder?: string,
    /**
     * Определяет необходимость валидации поля
     */
    required?: boolean,
    /**
     * Определяет необходимость валидации на корректную дату,
     * используется только для полей даты
     */
    isValidDatePositive?: boolean,
    /**
     * Определяет максимальное количество символов для ввода
     */
    maxLength: number
}