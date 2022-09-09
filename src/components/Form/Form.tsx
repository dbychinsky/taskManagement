import React, {useEffect, useState} from 'react';
import FormRow from "./FormRow/FormRow";
import Button from "../Button/Button";
import {FieldListForm} from "../Employee/EmployeeForm";

interface IForm {
    fieldListForm: FieldListForm[],
    onSubmitForm: () => void,
    onCancel: () => void
}

const Form = ({fieldListForm, onSubmitForm, onCancel}: IForm) => {
    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
    }

    return (
        <form onSubmit={submitHandler}>
            {
                fieldListForm.map(({label, field, message}, index) =>
                    <FormRow labelText={label} children={field} message={message} key={index}/>
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