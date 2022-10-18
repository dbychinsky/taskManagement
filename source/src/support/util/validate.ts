import {DateFormatter} from "./DateFormatter";
import {Error, Field, FeedbackForm} from "../../components/form/Form";

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
 * Регулярное выражение. Дата ГГГГ-ММ-ДД
 */
const DATE_RegEx = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Тип возвращаемого значения для результата
 * валидации
 */
type ValidationResult = {
    errorMessage: string;
    isValid: boolean;
}

/**
 * Список ошибок при валидации
 */
const enum validationErrorsText {
    IS_VALID = "",
    INVALID_EMPTY_FIELD_TEXT = "Поле должно быть заполнено",
    INVALID_NUMBER_POSITIVE_TEXT = "Допускаются только целые (положительные) числа",
    INVALID_DATE_TEXT = "Некорректная дата, формат должен быть ГГГГ-ММ-ДД",
    INVALID_DATE_RANGE_TEXT = "Дата начала больше даты окончания",
}

/**
 * Класс валидации
 */
class Validate {

    /**
     * Метод проверки на заполненность поля
     *
     * @param {string} data входные данные
     * @return {ValidationResult} результат проверки
     * @private
     */
    private isEmpty = (data: string): ValidationResult => {
        if (data === '' || data === undefined) {
            return {isValid: false, errorMessage: validationErrorsText.INVALID_EMPTY_FIELD_TEXT}
        }
        return {isValid: true, errorMessage: validationErrorsText.IS_VALID}
    };

    /**
     * Метод проверки поля на содержание только
     * положительных значений.
     * Заполняет данные ErrorList в случае ошибки.
     *
     * @param {Field} field проверяемое поле
     * @param {Error} error
     * @private
     */
    private isNumberPositive = (field: Field, error: Error) => {
        const IS_NUMBER = checkField(field.field.props.value);

        /**
         * Функция проверки поля.
         *
         * @param {number} count
         * @return {ValidationResult} результат проверки
         */
        function checkField(count: number): ValidationResult {
            if (count === null) {
                return {isValid: false, errorMessage: validationErrorsText.INVALID_EMPTY_FIELD_TEXT}
            } else {
                if (String(count).match(NUMBER_RegEx)) {
                    return {isValid: true, errorMessage: validationErrorsText.IS_VALID}
                }
                return {isValid: false, errorMessage: validationErrorsText.INVALID_NUMBER_POSITIVE_TEXT}
            }
        }

        if (field.field.props.isNumberPositive) {
            if (IS_NUMBER.isValid) {
                error.isValid = true;
                error.errorMessage = '';
            } else {
                if (error) {
                    error.isValid = false;
                    error.errorMessage = IS_NUMBER.errorMessage;
                }
            }
        }
    };

    /**
     * Метод проверки поля на соответствие даты шаблону YYYY-MM-DD.
     * Заполняет данные ErrorList в случае ошибки.
     *
     * @param {Field} field проверяемое поле
     * @param {Error} error
     * @private
     */
    private isCorrectDate(field: Field, error: Error) {
        const IS_CORRECT_DATE = checkField(field.field.props.value);

        /**
         * Функция проверки поля.
         *
         * @param {string} dateString
         * @return {ValidationResult} результат проверки
         */
        function checkField(dateString: string): ValidationResult {
            if (dateString) {
                const equalDate: Date | null = DateFormatter.getDateFromStr(dateString);
                if (dateString === DateFormatter.getStrFromDate(equalDate) && !isNaN(equalDate.getTime())) {
                    return {isValid: true, errorMessage: validationErrorsText.IS_VALID}
                }
            }
            return {isValid: false, errorMessage: validationErrorsText.INVALID_DATE_TEXT}
        }

        if (field.field.props.isValidDatePositive) {
            if (IS_CORRECT_DATE.isValid) {
                error.isValid = true;
                error.errorMessage = '';
            } else {
                if (error) {
                    error.isValid = false;
                    error.errorMessage = IS_CORRECT_DATE.errorMessage;
                }
            }
        }
    }

    /**
     * Метод проверки полей на корректный промежуток дат,
     * дата начала не должна быть позже даты окончания
     *
     * @param {string} startDate дата начала периода
     * @param {string} endDate дата окончания периода
     * @param {FeedbackForm} feedBackFormList список ошибок
     * @return {ValidationResult} результат проверки
     */
    public isDateInRange(startDate: string, endDate: string, feedBackFormList: FeedbackForm[]): FeedbackForm[] {
        if (DateFormatter.getDateFromStr(startDate).getTime() <= DateFormatter.getDateFromStr(endDate).getTime()) {
            feedBackFormList.map((elem) => {
                elem.isValid = true;
                elem.errorMessage = ''
            });
        } else {
            feedBackFormList.map((elem) => {
                elem.isValid = false;
                elem.errorMessage = validationErrorsText.INVALID_DATE_RANGE_TEXT;
            })
        }
        return feedBackFormList
    }

    /**
     * Метод валидации полей.
     * Принимает список полей и список ошибок. Вызывает по очереди
     * требуемые методы проверки и заполняет список ошибок.
     * 1) isRequired - флаг необходимости валидации поля
     * 2) disabled - проверяем имеет ли поле аттрибут disabled
     * 2) isEmpty - Поле обязательно к проверке (проверяется на заполненность)
     * 3) isLetterPositive - Метод проверки поля на содержание только букв
     * 4) isNumberPositive -Метод проверки поля на содержание только
     * положительных значений
     * 5) isCorrectDate - Метод проверки поля на соответствие даты шаблону YYYY-MM-DD
     *
     * @param {Field} fieldList список полей формы
     * @param {Error} errorList список ошибок
     * @return {Error} заполненный список ошибок
     */
    public checkFieldList = (fieldList: Field[], errorList: Error[]): Error[] => {
        fieldList.map((field) => {
            const error = errorList.find(elem => elem.name === field.field.props.name);

            if (field.field.props.isRequired) {

                if (!field.field.props.disabled) {

                    if (this.isEmpty(field.field.props.value).isValid) {
                        error.isValid = true;
                        error.errorMessage = '';

                        this.isNumberPositive(field, error);

                        this.isCorrectDate(field, error);

                    } else {
                        if (error) {
                            error.isValid = false;
                            error.errorMessage = this.isEmpty(field.field.props.value).errorMessage;
                        }
                    }
                }
            }
        });
        return errorList
    }

    /**
     * Метод валидации формы.
     *
     * @param {Error|FeedbackForm} list список ошибок полей формы
     * @return {boolean} результат проверки true/false
     */
    public isValidForm = (list: Error[] | FeedbackForm[]): boolean => {
        return typeof (list.find(element => element.isValid === false)) === 'undefined'
    }
}

export const validate = new Validate();

