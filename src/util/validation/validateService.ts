import {isValidEmptyField, isValidEmptyFieldText} from "./validateDate";
import {FieldListForm} from "../../components/Employee/EmployeeForm";

export type ErrorFieldState = {
    name: string,
    isValid: boolean
}

export const validation = (fieldFieldStateError: ErrorFieldState[], fieldList: FieldListForm[]): FieldListForm[] => {

    const changeFieldListErrors = (name: string, isValid: boolean) => {
        fieldFieldStateError.forEach((element) => {
            if (element.name === name) {
                element.isValid = isValid;
            }
        });
    }

    fieldList.map((fields) => {

        let fieldTemp = fields.field.props;

        if (fields.field.props.required) {
            if (isValidEmptyField(fields.field.props.value)) {
                fields.message = ''
                console.log('Поле валидно.', fields.message);
                changeFieldListErrors(fieldTemp.name, true);


            } else {
                fields.message = isValidEmptyFieldText;
                console.log('Поле не валидно.', fields.message);
                changeFieldListErrors(fieldTemp.name, false);
            }
        }
        return fields
    });

    return fieldList;

};