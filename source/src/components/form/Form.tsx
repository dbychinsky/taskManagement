import React, {FC, ReactElement} from 'react';
import FormRow from "./formRow/FormRow";
import Button from "../button/Button";

/**
 * Интерфейс работы с формой
 */
interface IFormProps {

    /**
     * Список полей для отображения
     */
    fieldList: Field[],

    /**
     * Список ошибок к полю
     */
    fieldErrorList: FieldError[],

    /**
     * Список ошибок к форме
     */
    formError?: FormError[],

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
    name: string,

    /**
     * Текстовое отображение имени поля
     */
    label: string,

    /**
     * ReactElement
     */
    field: ReactElement,

    /**
     * Валидация
     */
    validationList?: ((field: Field) => FieldError)[]
}

/**
 * Тип ошибки к полю
 */
export type FieldError = {

    /**
     * Имя поля
     */
    field: string,

    /**
     * Текстовое сообщение
     */
    message: string
}

/**
 * Тип ошибки к Форме
 */
export type FormError = {

    /**
     * Текстовое сообщение
     */
    message: string
}

/**
 * Компонент Form
 */
const Form: FC<IFormProps> = (
    {
        fieldList,
        fieldErrorList,
        formError,
        onSubmitForm,
        onCancel
    }) => {

    return (
        <form className={formError ? `form invalidForm` : `form`}>
            <div className="feedbackForm">{formError?.map((elem) => elem.message)}</div>
            <div className="fieldset">
                {
                    fieldList.map(({name, label, field,}, index) =>
                        <FormRow nameField={name}
                                 labelText={label}
                                 children={field}
                                 message={fieldErrorList.find(elem => elem.field === field.props.name)?.message}
                                 key={index}/>
                    )
                }
            </div>
            <div className="actionBar">
                <Button onClick={onSubmitForm} text="Сохранить"/>
                <Button onClick={onCancel} text="Отмена"/>
            </div>
        </form>
    );
};

export default Form;