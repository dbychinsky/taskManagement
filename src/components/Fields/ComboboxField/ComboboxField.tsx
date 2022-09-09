import React, {ChangeEventHandler} from 'react';
import './Combobox.scss';

interface IComboboxFieldProp {
    changeHandler: ChangeEventHandler,
    valueList: { statusId: string, statusText: string }[],
    defaultValue: string,
    disabled?: boolean
}

const ComboboxField = ({changeHandler, valueList, defaultValue, disabled}: IComboboxFieldProp) => {
    return (
        <select onChange={changeHandler} defaultValue={defaultValue} disabled={disabled}>
            {
                valueList.map((elem, index) => {
                    return <option key={index} value={elem.statusId}>{elem.statusText}</option>
                })
            }
        </select>
    )
}

export default ComboboxField;

