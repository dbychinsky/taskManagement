import React, {FC, useState} from 'react';
import Label from "../../Label/Label";

type FormRow = {
    labelText: string,
    children: JSX.Element,
    errorMessage?: string
};

const FormRow: FC<FormRow> = ({labelText, children, errorMessage}) => {
    return (
        <div className="formRow">
            <Label text={labelText}/>
            {children}
            <div className='feedback'>{errorMessage}</div>
        </div>
    );
}

export default FormRow;

