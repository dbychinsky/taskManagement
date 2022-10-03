import {ReactElement} from "react";

/**
 * Типы, используемые во всем приложении и не имеюют отдельных компонентов
 */

/**
 * Тип FieldList, список полей формы. С
 */
export type FieldList = {
    /**
     * Имя поля
     */
    name?: string,

    /**
     * Текстовое отображение имени поля
     */
    label: string,

    /**
     * ReactElement
     */
    field: ReactElement
}

/**
 * Тип ErrorList, список ошибок для формы
 */

export type ErrorList =
    {
        /**
         * Имя ошибки
         */
        name: string,

        /**
         * Флаг валидности
         */
        isValid: boolean,

        /**
         * Текстовое сообщение
         */
        errorMessage: string
    }