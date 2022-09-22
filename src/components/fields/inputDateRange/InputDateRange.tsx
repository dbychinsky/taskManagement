import React from 'react';
import InputTextField from "../inputTextField/InputTextField";

/**
 * Компонент DateRange
 */

interface IInputDateField {
    valueStartDate: string,
    valueEndDate: string,
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
    required?: boolean,
    isValidDatePositive?: boolean
}

const InputDateRange = ({
                            valueStartDate,
                            valueEndDate,
                            changeHandler,
                            required
                        }: IInputDateField) => {
    return (
        <div className="dateRange">
            <InputTextField
                type="text"
                value={valueStartDate}
                changeHandler={changeHandler}
                name="startDate"
                maxLength={10}
                required={required}
            />
            <InputTextField
                type="text"
                value={valueEndDate}
                changeHandler={changeHandler}
                name="endDate"
                maxLength={10}
                required={required}
            />
        </div>
    );
};

export default InputDateRange;


