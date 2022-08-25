import React, {ChangeEventHandler} from 'react';
import TaskStatus from "../../model/TaskStatus";
import './Combobox.scss';

interface IComboboxFieldProp<T> {
    choices?: TaskStatus[],
    changeHandler: ChangeEventHandler,
    name: string
}

const ComboboxField = <T, >({choices, changeHandler}: IComboboxFieldProp<T>) => {

    const onHandleChange = () => {
        // changeHandler(choice);
    }

    return (
        <select onChange={onHandleChange}>
            <option></option>
            {
                choices.map((choice, index) => {
                    return <option key={index} value={choice}>{choice}</option>
                })
            }
        </select>

    )
}

export default ComboboxField;

