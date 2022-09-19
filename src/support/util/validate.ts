import {ConvertDate} from "./convertDate";
import {ErrorList, FieldList} from "../type";
import {FormFeedback} from "../../components/form/Form";


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
    IS_VALID_EMPTY_FIELD_TEXT = "Поле должно быть заполнено",
    IS_VALID_LETTER_POSITIVE_TEXT = "Допускаются только буквы",
    IS_VALID_NUMBER_POSITIVE_TEXT = "Допускаются только целые (положительные) числа",
    IS_VALID_DATE_TEXT = "Некорректная дата, формат должен быть YYYY-MM-DD",
    IS_VALID_DATE_RANGE_TEXT = "Дата начала больше даты окончания",
}

class Validate {

    // Поле заполнено
    private isValidEmptyField = (data: string): ResultValidation => {
        if (data === '' || data === undefined) {
            return {isValid: false, errorMessage: validationErrorsText.IS_VALID_EMPTY_FIELD_TEXT}
        }
        return {isValid: true, errorMessage: validationErrorsText.IS_VALID}
    };

    // Проверка на буквы
    private isValidLetterPositive = (data: string): ResultValidation => {
        if (data) {
            if (data.match(LETTER_RegEx)) {
                return {isValid: true, errorMessage: validationErrorsText.IS_VALID}
            }
            return {isValid: false, errorMessage: validationErrorsText.IS_VALID_LETTER_POSITIVE_TEXT}
        }
    };

    // Проверка на положительное число
    private isValidNumberPositive = (count: number): ResultValidation => {
        if (count === null) {
            return {isValid: false, errorMessage: validationErrorsText.IS_VALID_EMPTY_FIELD_TEXT}
        } else {
            if (String(count).match(NUMBER_RegEx)) {
                return {isValid: true, errorMessage: validationErrorsText.IS_VALID}
            }
            return {isValid: false, errorMessage: validationErrorsText.IS_VALID_NUMBER_POSITIVE_TEXT}
        }
    };

    // Проверка на корректную дату
    private isValidDate(dateString: string): ResultValidation {
        if (dateString) {
            const equalDate: Date | null = ConvertDate.getDateFromStr(dateString);
            if (dateString === ConvertDate.getStrFromDate(equalDate) && !isNaN(equalDate.getTime())) {
                return {isValid: true, errorMessage: validationErrorsText.IS_VALID}
            }
        }
        return {isValid: false, errorMessage: validationErrorsText.IS_VALID_DATE_TEXT}
    }


    // Передаю список полей, список ошибок. Получаю заполненный список ошибок.
    public validateField = (fieldList: FieldList[], errorList: ErrorList[]): ErrorList[] => {
        fieldList.map((fields) => {

            // Проверка на необходимость быть заполненным
            // Если поле не пустое - проводим проверки дальше
            if (fields.field.props.required) {
                const target = errorList.find(elem => elem.name === fields.field.props.name);

                if (!fields.field.props.disabled) {
                    // Проверка на заполненность
                    // Если поле не пустое - проводим проверки дальше
                    const IS_VALID_EMPTY_FIELD = this.isValidEmptyField(fields.field.props.value);


                    console.log(fields.field.props.value);

                    if (IS_VALID_EMPTY_FIELD.isValid) {
                        target.isValid = true;
                        target.errorMessage = '';

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

                        const IS_VALID_DATE = this.isValidDate(fields.field.props.value);
                        if (fields.field.props.isValidDatePositive) {
                            if (IS_VALID_DATE.isValid) {
                                target.isValid = true;
                                target.errorMessage = '';
                            } else {
                                if (target) {
                                    target.isValid = false;
                                    target.errorMessage = IS_VALID_DATE.errorMessage;
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
            }
        });
        return errorList
    }

    // Проверка промежутка даты
    public validDateRange(fieldList: FieldList[], feedBackFormList: FormFeedback[]): FormFeedback[] {

        const startDate = fieldList.find((elem) => elem.field.props.name === "startDate").field.props.value;
        const endDate = fieldList.find((elem) => elem.field.props.name === "endDate").field.props.value;

        if (ConvertDate.getDateFromStr(startDate).getTime() <= ConvertDate.getDateFromStr(endDate).getTime()) {
            feedBackFormList.map((elem) => {
                elem.isValid = true;
                elem.errorMessage = ''
            });
        } else {
            feedBackFormList.map((elem) => {
                elem.isValid = false;
                elem.errorMessage = validationErrorsText.IS_VALID_DATE_RANGE_TEXT;
            })
        }
        return feedBackFormList

    }

    // Валидация формы, если в списке ошибок есть false - вся форма не валидна
    public isValidForm = (list: ErrorList[] | FormFeedback[]): boolean => {
        return typeof (list.find(element => element.isValid === false)) === 'undefined'
    }
}

export const validate = new Validate();

