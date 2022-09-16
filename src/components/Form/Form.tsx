import React, {ChangeEvent} from 'react';
import FormRow from "./FormRow/FormRow";
import Button from "../Button/Button";
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
            <p>{feedBackForm.map((elem) => elem.errorMessage)}</p>
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