import React, {ChangeEvent, ChangeEventHandler} from 'react';
import './Combobox.scss';

interface IComboboxFieldProp {
    changeHandler: (event: ChangeEvent<HTMLSelectElement>) => void,
    valueList: { statusId: string, statusText: string }[],
    defaultValue: string,
    name: string,
    disabled?: boolean,
    required?: boolean
    isValidEmptyFieldCombobox?: boolean
}

const ComboboxField = ({changeHandler, valueList, defaultValue, disabled, name}: IComboboxFieldProp) => {
    return (
        <select onChange={changeHandler} defaultValue={defaultValue} disabled={disabled} name={name}>
            <option></option>
            {
                valueList.map((elem, index) => {
                    return <option key={index} value={elem.statusId}>{elem.statusText}</option>
                })
            }
        </select>
    )
}

export default ComboboxField;

