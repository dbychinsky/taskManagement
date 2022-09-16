import React, {ChangeEvent, ChangeEventHandler} from 'react';
import './Combobox.scss';

interface IComboboxFieldProp {
    changeHandler: (event: ChangeEvent<HTMLSelectElement>) => void,
    valueList: { statusId: string, statusText: string }[],
    value: string,
    name: string,
    disabled?: boolean,
    required?: boolean
    isValidEmptyFieldCombobox?: boolean
}

const ComboboxField = ({changeHandler, valueList, value, disabled, name}: IComboboxFieldProp) => {
    return (
        <select onChange={changeHandler} defaultValue={value} disabled={disabled} name={name}>
            <option value={""}>Выберите значение</option>
            {
                valueList.map((elem, index) => {
                    return <option key={index} value={elem.statusId}>{elem.statusText}</option>
                })
            }
        </select>
    )
}

export default ComboboxField;

