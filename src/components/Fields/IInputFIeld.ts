import React from "react";

// Общий интерфейс для работы с полями
export interface IInputFieldProps {
    value?: string | number,
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
    name: string,
    placeholder?: string,
    required: boolean,
}