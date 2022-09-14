import {FieldList} from "../components/Task/TaskForm";
import {ErrorList} from "../components/Form/Form";


//---------------------------------------------------------------------------------------------------------------
// Допускаются только буквы
const LETTER_RegEx = /^[а-яa-zА-ЯA-Z][а-яa-zA-ZА-Я\\s]*$/;
// Допускаются только цифры
const NUMBER_RegEx = /^[1-9]\d*$/;
// Дата YYYY.MM.DD
const DATE_RegEx = /^\d{4}-\d{2}-\d{2}$/;

interface ResultValidation {
    errorMessage: string;
    isValid: boolean;
}

const enum validationErrorsText {
    IS_VALID = "",
    IS_VALID_EMPTY_FIELD_TEXT = "Поле обязательно к заполнению",
    IS_VALID_LETTER_POSITIVE_TEXT = "Допускаются только буквы",
    IS_VALID_NUMBER_POSITIVE_TEXT = "Допускаются только целые (положительные) числа",
}

class Validate {

    // Поле заполнено
    private isValidEmptyField = (data: string): ResultValidation => {
        if (data !== '' && data !== null) {
            return {isValid: true, errorMessage: validationErrorsText.IS_VALID}
        }
        return {isValid: false, errorMessage: validationErrorsText.IS_VALID_EMPTY_FIELD_TEXT}
    };

    // Проверка на буквы
    private isValidLetterPositive = (data: string): ResultValidation => {
        if (data.match(LETTER_RegEx)) {
            return {isValid: true, errorMessage: validationErrorsText.IS_VALID}
        }
        return {isValid: false, errorMessage: validationErrorsText.IS_VALID_LETTER_POSITIVE_TEXT}
    };

    // Проверка на положительное число
    private isValidNumberPositive = (count: number): ResultValidation => {
        if (String(count).match(NUMBER_RegEx)) {
            return {isValid: true, errorMessage: validationErrorsText.IS_VALID}
        }
        return {isValid: false, errorMessage: validationErrorsText.IS_VALID_NUMBER_POSITIVE_TEXT}
    };

    // Передаю список полей, список ошибок. Получаю заполненный список ошибок.
    public validateField = (fieldList: FieldList[], errorList: ErrorList[]): ErrorList[] => {
        fieldList.map((fields) => {

            // Проверка на необходимость быть заполненным
            // Если поле не пустое - проводим проверки дальше
            if (fields.field.props.required) {
                const target = errorList.find(elem => elem.name === fields.field.props.name);

                // Проверка на заполненность
                // Если поле не пустое - проводим проверки дальше
                const IS_VALID_EMPTY_FIELD = this.isValidEmptyField(fields.field.props.value);
                if (IS_VALID_EMPTY_FIELD.isValid) {
                    target.isValid = true;
                    target.errorMessage = '';

                    // Проверка на отсутствие любых символов кроме цифр
                    const IS_VALID_NUMBER = this.isValidNumberPositive(fields.field.props.value);
                    if (fields.field.props.isValidNumberPositive) {
                        if (IS_VALID_NUMBER.isValid) {
                            target.isValid = true;
                            target.errorMessage = '';
                        } else {
                            if (target) {
                                target.isValid = false;
                                target.errorMessage = IS_VALID_NUMBER.errorMessage;
                            }
                        }
                    }

                    // Проверка на отсутствие любых символов кроме букв
                    const IS_VALID_LETTER = this.isValidLetterPositive(fields.field.props.value);
                    if (fields.field.props.isValidLetterPositive) {
                        if (IS_VALID_LETTER.isValid) {
                            target.isValid = true;
                            target.errorMessage = '';
                        } else {
                            if (target) {
                                target.isValid = false;
                                target.errorMessage = IS_VALID_LETTER.errorMessage;
                            }
                        }

                    }
                } else {
                    if (target) {
                        target.isValid = false;
                        target.errorMessage = IS_VALID_EMPTY_FIELD.errorMessage;
                    }
                }
            }
        });
        return errorList
    }

    // Валидация формы, если в списке ошибок есть false - вся форма не валидна
    public isValidForm = (errorList: ErrorList[]): boolean => {
        return typeof (errorList.find(element => element.isValid == false)) == 'undefined'
    }
}

export const validate = new Validate();

