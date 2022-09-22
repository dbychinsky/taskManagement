import React, {ChangeEvent, ChangeEventHandler, FC} from 'react';
import './Combobox.scss';

/**
 * Компонент Combobox
 */

interface IComboboxFieldProps {
    changeHandler: (event: ChangeEvent<HTMLSelectElement>) => void,
    valueList: { statusId: string, statusText: string }[],
    value: string,
    name: string,
    disabled?: boolean,
    required?: boolean
    isValidEmptyFieldCombobox?: boolean
}

const ComboboxField: FC<IComboboxFieldProps> = (
    {
        changeHandler,
        valueList,
        value,
        disabled,
        name
    }) => {
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

