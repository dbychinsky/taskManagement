import React, {ChangeEvent, FC, ReactElement} from 'react';
import FormRow from "./formRow/FormRow";
import Button from "../button/Button";

/**
 * Компонент Form
 */

/**
 * Тип для обратных сообщений формы
 */
export type FeedbackForm = {

    /**
     * Флаг валидности поля
     */
    isValid: boolean,

    /**
     * Текстовое сообщение об ошибке
     */
    errorMessage: string
}

/**
 * Интерфейс работы с формой
 */
interface IFormProps {

    /**
     * Список полей для отображения
     */
    fieldList: Field[],

    /**
     * Список ошибок
     */
    errorList: Error[],

    /**
     * Общее сообщение для формы (информационное или
     * используемое для вывода ошибок всей формы)
     */
    feedBackForm: FeedbackForm[],

    /**
     * Отправка данных формы
     */
    onSubmitForm: (value?: boolean) => void,

    /**
     * Отмена отправки
     */
    onCancel: (value?: boolean) => void
}

/**
 * Тип FieldList, список полей формы.
 */
export type Field = {

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
export type Error =
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

const Form: FC<IFormProps> = (
    {
        fieldList,
        errorList,
        feedBackForm,
        onSubmitForm,
        onCancel
    }) => {
    return (
        <form>
            <div className="feedbackForm">{feedBackForm.map((elem) => elem.errorMessage)}</div>
            {
                fieldList.map(({name, label, field,}, index) =>
                    <FormRow nameField={name}
                             labelText={label}
                             children={field}
                             errorMessage={errorList.find(elem => elem.name === field.props.name).errorMessage}
                             key={index}/>
                )
            }
            <div className="actionBar">
                <Button onClick={onSubmitForm} text="Сохранить"/>
                <Button onClick={onCancel} text="Отмена"/>
            </div>
        </form>
    );
};

export default Form;