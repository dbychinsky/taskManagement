import React, {FC} from 'react';
import Label from "../../Label/Label";

type FormRow = {
    labelText: string,
    children: JSX.Element,
};

const FormRow: FC<FormRow> = ({
                                  labelText,
                                  children
                              }) => (
    <div className="formRow">
        <Label text={labelText}/>
        {children}
    </div>
);

export default FormRow;

