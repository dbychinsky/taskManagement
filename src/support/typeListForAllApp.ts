import {ReactElement} from "react";

/**
 * Типы, используемые во всем приложении и не имеюют отдельных компонентов
 */

/**
 * Тип FieldList, список полей формы. Содержит описание к полю и само поле
 */
export type FieldList = {
    name?: string,
    label: string,
    field: ReactElement
}

/**
 * Тип ErrorList, список ошибок для формы
 */

export type ErrorList =
    {
        name: string,
        isValid: boolean,
        errorMessage: string
    }