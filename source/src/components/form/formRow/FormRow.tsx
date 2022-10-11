import React, {FC, useState} from 'react';
import Label from "../../label/Label";

/**
 * Компонент FormRow, обьединяет поля - отображение
 * описания поля (Label), ввод данных, отображение
 * сообщения к полю (ошибки).
 */
interface FormRow {

    /**
     * Имя поля
     */
    nameField: string,

    /**
     * Текст описания к полю
     */
    labelText: string,

    /**
     * Поле формы
     */
    children: JSX.Element,

    /**
     * Сообщение об ошибке
     */
    errorMessage?: string
};

const FormRow: FC<FormRow> = (
    {
        nameField,
        labelText,
        children,
        errorMessage
    }) => {
    return (
        <div className={`formRow ${nameField}`}>
            <Label text={labelText}/>
            {children}
            <div className='feedback'>{errorMessage}</div>
        </div>
    );
}

export default FormRow;

