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
    message?: string
};

const FormRow: FC<FormRow> = (
    {
        nameField,
        labelText,
        children,
        message
    }) => {
    return (
        <div className={message? `formRow invalid ${nameField}` : `formRow ${nameField}`}>
            <Label text={labelText}/>
            {children}
            <div className='feedback'>{message}</div>
        </div>
    );
}

export default FormRow;

