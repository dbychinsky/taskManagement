import {ConvertDate} from "./convertDate";
import {ErrorList, FieldList} from "../typeListForAllApp";
import {FormFeedback} from "../../components/form/Form";

/**
 * Валидация данных
 */

/**
 * Регулярное выражение. Допускаются только буквы
 */
const LETTER_RegEx = /^[а-яa-zА-ЯA-Z][а-яa-zA-ZА-Я\\s]*$/;

/**
 * Регулярное выражение. Допускаются только цифры
 */
const NUMBER_RegEx = /^[1-9]\d*$/;

/**
 * Регулярное выражение. Дата YYYY.MM.DD
 */
const DATE_RegEx = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Тип возвращаемого значения для результата
 * валидации
 */
type ResultValidation = {
    errorMessage: string;
    isValid: boolean;
}

/**
 * Список ошибок при валидации
 */
const enum validationErrorsText {
    IS_VALID = "",
    IS_VALID_EMPTY_FIELD_TEXT = "Поле должно быть заполнено",
    IS_VALID_LETTER_POSITIVE_TEXT = "Допускаются только буквы",
    IS_VALID_NUMBER_POSITIVE_TEXT = "Допускаются только целые (положительные) числа",
    IS_VALID_DATE_TEXT = "Некорректная дата, формат должен быть YYYY-MM-DD",
    IS_VALID_DATE_RANGE_TEXT = "Дата начала больше даты окончания",
}


/**
 * Класс валидации
 */
class Validate {

    /**
     * Метод проверки на заполненность поля
     *
     * @param {string} data входные данные
     * @return {ResultValidation} результат проверки
     * @private
     */
    private isValidEmptyField = (data: string): ResultValidation => {
        if (data === '' || data === undefined) {
            return {isValid: false, errorMessage: validationErrorsText.IS_VALID_EMPTY_FIELD_TEXT}
        }
        return {isValid: true, errorMessage: validationErrorsText.IS_VALID}
    };

    /**
     * Метод проверки поля на содержание только букв
     *
     * @param {string} data входные данные
     * @return {ResultValidation} результат проверки
     * @private
     */
    private isValidLetterPositive = (data: string): ResultValidation => {
        if (data) {
            if (data.match(LETTER_RegEx)) {
                return {isValid: true, errorMessage: validationErrorsText.IS_VALID}
            }
            return {isValid: false, errorMessage: validationErrorsText.IS_VALID_LETTER_POSITIVE_TEXT}
        }
    };

    /**
     * Метод проверки поля на содержание только
     * положительных значений
     *
     * @param {number} count входные данные
     * @return {ResultValidation} результат проверки
     * @private
     */
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

    /**
     * Метод проверки поля на корректную дату
     *
     * @param {string} dateString входные данные
     * @return {ResultValidation} результат проверки
     * @private
     */
    private isValidDate(dateString: string): ResultValidation {
        if (dateString) {
            const equalDate: Date | null = ConvertDate.getDateFromStr(dateString);
            if (dateString === ConvertDate.getStrFromDate(equalDate) && !isNaN(equalDate.getTime())) {
                return {isValid: true, errorMessage: validationErrorsText.IS_VALID}
            }
        }
        return {isValid: false, errorMessage: validationErrorsText.IS_VALID_DATE_TEXT}
    }

    /**
     * Метод проверки полей на корректный промежуток дат
     *
     * @param {FieldList} fieldList список полей
     * @param {FormFeedback} feedBackFormList список ошибок
     * @return {ResultValidation} результат проверки
     */
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

    /**
     * Метод валидации формы.
     *
     * @param {ErrorList|FormFeedback} list список ошибок полей формы
     * @return {boolean} результат проверки true/false
     */
    public isValidForm = (list: ErrorList[] | FormFeedback[]): boolean => {
        return typeof (list.find(element => element.isValid === false)) === 'undefined'
    }

    /**
     * Метод валидации.
     * Принимает список полей и список ошибок. Вызывает по очереди
     * требуемые методы проверки и заполняет список ошибок.
     *
     * @param {FieldList} fieldList список полей формы
     * @param {ErrorList} errorList список ошибок
     */
    public validateField = (fieldList: FieldList[], errorList: ErrorList[]): ErrorList[] => {
        fieldList.map((fields) => {

            /**
             * Проверка на обязательность заполнения
             */
            if (fields.field.props.required) {
                const target = errorList.find(elem => elem.name === fields.field.props.name);

                /**
                 * Проверка доступно ли поле (disabled)
                 */
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
}

export const validate = new Validate();

