import React, {ChangeEvent, FC} from 'react';
import FormRow from "./formRow/FormRow";
import Button from "../button/Button";
import {ErrorList, FieldList} from "../../support/typeListForAllApp";

/**
 * Компонент Form, принимает label, field, errorMessage
 */

export type FormFeedback = {
    isValid: boolean,
    errorMessage: string
}

interface IFormProps {
    fieldList: FieldList[],
    errorList: ErrorList[],
    feedBackForm: FormFeedback[],
    onSubmitForm: (value?: boolean) => void,
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