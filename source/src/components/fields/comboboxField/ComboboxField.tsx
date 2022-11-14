import React, {ChangeEvent, FC} from 'react';
import './Combobox.scss';

/**
 * Компонент Combobox
 */
type IComboboxFieldProps = {

    /**
     * Метод, вызывающийся при изменении поля
     *
     * @param event выбранное значение
     */
    changeHandler: (event: ChangeEvent<HTMLSelectElement>) => void,

    /**
     * Возможные значения
     */
    valueList: { statusId: string, statusText: string }[],

    /**
     * Значение в поле ввода
     */
    value: string,

    /**
     * Имя поля
     */
    name: string,

    /**
     * Атрибут для определения доступности для выбора
     */
    disabled?: boolean,

    /**
     * Определяет необходимость валидации поля
     */
    isHasValue?: boolean,

    /**
     * Определяет необходимость валидации поля на отсутствующее значение
     */
    isValidEmptyFieldCombobox?: boolean,

    optionDefaultValue?: string
}

const ComboboxField: FC<IComboboxFieldProps> = (
    {
        changeHandler,
        valueList,
        value,
        disabled,
        name,
        optionDefaultValue
    }) => {
    return (
        <select onChange={changeHandler}
                defaultValue={value}
                disabled={disabled}
                name={name}>
            <option value={""}>{optionDefaultValue ? optionDefaultValue : 'Выберите значение'}</option>
            {
                valueList.map((elem, index) => {
                    return <option key={index} value={elem.statusId}>{elem.statusText}</option>
                })
            }
        </select>
    )
}

export default ComboboxField;

