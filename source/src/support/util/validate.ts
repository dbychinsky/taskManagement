import {DateFormatter} from "./DateFormatter";
import {Field, ErrorMessage} from "../../components/form/Form";

/**
 * Валидация данных
 */

/**
 * Регулярное выражение. Допускаются только цифры
 */
const NUMBER_REGEX = /^[1-9]\d*$/;

/**
 * Список ошибок при валидации
 */
const enum validationErrorsText {
    IS_VALID = "",
    INVALID_EMPTY_FIELD_TEXT = "Поле должно быть заполнено",
    INVALID_NUMBER_POSITIVE_TEXT = "Допускаются только целые (положительные) числа",
    INVALID_DATE_TEXT = "Некорректная дата, формат должен быть ГГГГ-ММ-ДД",
    INVALID_DATE_RANGE_TEXT = "Дата окончания меньше даты начала",
}

/**
 * Класс валидации
 */
class Validate {

    /**
     * Валидация полей формы. Принимает список полей,
     * возвращает список ошибок, если ошибок нет - пустой список.
     *
     * @param {Field[]} fieldList список полей
     * @return {ErrorMessage[]} список ошибок/пустой
     */
    public formValidator(fieldList: Field[]): ErrorMessage[] {
        let errorList: ErrorMessage[] = [];

        fieldList.forEach((field) => {
            errorList = errorList.concat(this.fieldValidator(field));
        });

        return errorList;
    }

    /**
     * Валидация поля. Принимает поле, возврает список ошибок,
     * если ошибок нет - пустой список.
     *
     * @param {Field} field поле из формы
     * @return {ErrorMessage} возвращает ошибку, если ошибки нет -
     * прерывает выполнение
     */
    public fieldValidator(field: Field): ErrorMessage[] {
        let errorList: ErrorMessage[] = [];

        field.validationList.forEach((validate: any) => {
            const error = validate(field);
            if (error) {
                errorList.push(error)
            }
        })

        return errorList;
    }

    /**
     * Метод проверки на заполненность поля
     *
     * @param {Field} field поле из формы
     * @return {ErrorMessage} возвращает ошибку, если ошибки нет -
     * прерывает выполнение
     */
    public emptyValidator = (field: Field): ErrorMessage => {
        if (field.field.props.value === '' ||
            field.field.props.value === undefined ||
            field.field.props.value === null) {

            return {name: field.field.props.name, errorMessage: validationErrorsText.INVALID_EMPTY_FIELD_TEXT};

        } else {
            return;
        }
    }

    /**
     * Метод проверки на содержание только
     * положительных значений.
     *
     * @param {Field} field числовое поле
     * @return {ErrorMessage} возвращает ошибку, если ошибки нет -
     * прерывает выполнение
     */
    public numberValidator = (field: Field): ErrorMessage => {
        if (String(field.field.props.value).match(NUMBER_REGEX)) {
            return;
        }

        return {name: field.field.props.name, errorMessage: validationErrorsText.INVALID_NUMBER_POSITIVE_TEXT};
    }

    /**
     * Метод проверки поля на соответствие даты шаблону YYYY-MM-DD.
     *
     * @param {Field} field поле даты
     * @return {ErrorMessage} ошибка, если ошибок нет -
     * @return {ErrorMessage} возвращает ошибку, если ошибки нет -
     * прерывает выполнение
     */
    public dateFormatValidator = (field: Field): ErrorMessage => {
        if (field.field.props.value) {
            const equalDate: Date | null = DateFormatter.getDateFromStr(field.field.props.value);
            if (field.field.props.value === DateFormatter.getStrFromDate(equalDate) && !isNaN(equalDate.getTime())) {
                return;
            }
        }

        return {name: field.field.props.name, errorMessage: validationErrorsText.INVALID_DATE_TEXT};
    }

    /**
     * Метод проверки полей на корректный промежуток дат,
     * дата начала не должна быть позже даты окончания
     *
     * @param {string} value дата  начала
     * @param {Field} field дата окончания
     * @return {ErrorMessage} возвращает ошибку, если ошибки нет -
     * прерывает выполнение
     */
    public dateRangeValidator = (value: string, field: Field): ErrorMessage => {
        const secondDate = DateFormatter.getDateFromStr(value)?.getTime();
        const firstDate = DateFormatter.getDateFromStr(field.field.props.value)?.getTime();

        if (secondDate && firstDate) {
            if (firstDate < secondDate) {
                return {name: field.field.props.name, errorMessage: validationErrorsText.INVALID_DATE_RANGE_TEXT};
            } else {
                return;
            }
        }
        return;
    }

}

export const validate = new Validate();

