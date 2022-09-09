import React, {FC, useState} from 'react';
import Label from "../../Label/Label";

type FormRow = {
    labelText: string,
    children: JSX.Element,
    message?: string
};

const FormRow: FC<FormRow> = ({labelText, children, message}) => {
    return (
        <div className="formRow">
            <Label text={labelText}/>
            {children}
            <div className="feedback">{message}</div>
        </div>
    );
}

export default FormRow;

