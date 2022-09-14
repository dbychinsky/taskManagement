import React, {useState} from 'react';
import FormRow from "./FormRow/FormRow";
import Button from "../Button/Button";
import {validate} from "../../util/validate";
import {FieldList} from "../Task/TaskForm";

export type ErrorList =
    {
        name: string,
        isValid: boolean,
        errorMessage: string
    }

interface IForm {
    fieldList: FieldList[],
    onPushStorage: (value?: boolean) => void,
    onCancel: (value?: boolean) => void
}

const Form = ({fieldList, onPushStorage, onCancel}: IForm) => {

    // Формируем список ошибок на основе списка полей формы
    const [errorList, setErrorList] = useState<ErrorList[]>(
        fieldList.map(elem => {
            return {name: elem.field.props.name, isValid: true, errorMessage: ''}
        }));


    const submitForm = () => {
        setErrorList(validate.validateField(fieldList, errorList));
        setErrorList(errorList => [...errorList]);
        if (validate.isValidForm(errorList)) {
            onPushStorage();
        } else console.log('Форма не валидна');
    }

    return (
        <form>
            {
                fieldList.map(({label, field,}, index) =>
                    <FormRow labelText={label}
                             children={field}
                             errorMessage={errorList.find(elem => elem.name === field.props.name).errorMessage}
                             key={index}/>
                )
            }
            <div className="actionBar">
                <Button onClick={submitForm} text="Сохранить"/>
                <Button onClick={onCancel} text="Отмена"/>
            </div>
        </form>
    );
};

export default Form;