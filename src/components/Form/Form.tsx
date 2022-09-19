import React, {ChangeEvent} from 'react';
import FormRow from "./formRow/FormRow";
import Button from "../button/Button";
import {ErrorList, FieldList} from "../../support/type";

interface IForm {
    fieldList: FieldList[],
    errorList: ErrorList[],
    feedBackForm: FormFeedback[],
    onSubmitForm: (value?: boolean) => void,
    onCancel: (value?: boolean) => void
}

export type FormFeedback =
    {
        isValid: boolean,
        errorMessage: string
    }

const Form = ({fieldList, errorList, feedBackForm, onSubmitForm, onCancel}: IForm) => {

    return (
        <form>
            <div className="feedbackForm">{feedBackForm.map((elem) => elem.errorMessage)}</div>
            {
                fieldList.map(({label, field,}, index) =>
                    <FormRow labelText={label}
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