import React, {ChangeEventHandler} from 'react';
import './Combobox.scss';

interface IComboboxFieldProp {
    changeHandler: ChangeEventHandler,
    valueList: { value: string, option: string }[],
    defaultValue: string,
    disabled?: boolean
}

const ComboboxField = ({changeHandler, valueList, defaultValue, disabled}: IComboboxFieldProp) => {
    return (
        <select onChange={changeHandler} defaultValue={defaultValue} disabled={disabled}>
            <option></option>
            {
                valueList.map((elem, index) => {
                    return <option key={index} value={elem.value}>{elem.option}</option>
                })
            }
        </select>

    )
}


export default ComboboxField;

