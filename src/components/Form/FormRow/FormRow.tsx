import React, {FC, useState} from 'react';
import Label from "../../label/Label";

type FormRow = {
    nameField:string,
    labelText: string,
    children: JSX.Element,
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

