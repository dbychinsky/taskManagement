import React from "react";

/**
 * Общий интерфейс для работы с input
 */

export interface IInputFieldProps {
    value?: string | number,
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
    name: string,
    placeholder?: string,
    required?: boolean,
    isValidDatePositive?: boolean,
    maxLength: number
}