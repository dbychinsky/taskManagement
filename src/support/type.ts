/**
 * Типы, используемые во всем приложении
 */

/**
 * Тип FieldList, список полей формы. Содержит описание к полю и само поле
 */
export type FieldList = {
    label: string,
    field: JSX.Element
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