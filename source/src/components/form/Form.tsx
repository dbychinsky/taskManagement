import React, {ChangeEvent, FC} from 'react';
import FormRow from "./formRow/FormRow";
import Button from "../button/Button";
import {ErrorList, FieldList} from "../../support/typeListForAllApp";

/**
 * Компонент Form
 */

/**
 * Тип для обратных сообщений формы
 */
export type FormFeedback = {
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
    fieldList: FieldList[],
    /**
     * Список ошибок
     */
    errorList: ErrorList[],
    /**
     * Общее сообщение для формы (информационное или
     * используемое для вывода ошибок всей формы)
     */
    feedBackForm: FormFeedback[],
    /**
     * Отправка данных формы
     */
    onSubmitForm: (value?: boolean) => void,
    /**
     * Отмена отправки
     */
    onCancel: (value?: boolean) => void
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