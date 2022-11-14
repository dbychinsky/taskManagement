import React, {ChangeEvent, FC, ReactElement, useState} from 'react';
import FormRow from "./formRow/FormRow";
import Button from "../button/Button";
import {validate} from "../../support/util/Validate";

/**
 * Интерфейс работы с формой
 */
interface IFormProps {

    /**
     * Список полей для отображения
     */
    fieldList: Field[],

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
    validationList?: ((field: Field) => ErrorMessage)[]
}

/**
 * Тип ошибки к полю
 */
export type ErrorMessage = {

    /**
     * Имя ошибки
     */
    name: string,

    /**
     * Текстовое сообщение
     */
    errorMessage: string
}

/**
 * Компонент Form
 */
const Form: FC<IFormProps> = (
    {
        fieldList,
        onSubmitForm,
        onCancel
    }) => {


    /**
     * Метод для формирования списка ошибок на основе полей формы
     * и добавление их в состояние
     */
    const [errorListState, setErrorListState] = useState<ErrorMessage[]>(
        fieldList.map(elem => {
            return {name: elem.field.props.name, errorMessage: ''}
        }));

    /**
     * Отправка формы
     */
    const onSubmit = () => {

        const errorList = validate.formValidator(fieldList);

        setErrorListState(errorList);

        if (!errorList.length) {
            onSubmitForm();
        }
    }

    return (
        <form>
            {
                fieldList.map(({name, label, field,}, index) =>
                    <FormRow nameField={name}
                             labelText={label}
                             children={field}
                             errorMessage={errorListState.find(elem => elem.name === field.props.name)?.errorMessage}
                             key={index}/>
                )
            }
            <div className="actionBar">
                <Button onClick={onSubmit} text="Сохранить"/>
                <Button onClick={onCancel} text="Отмена"/>
            </div>
        </form>
    );
};

export default Form;