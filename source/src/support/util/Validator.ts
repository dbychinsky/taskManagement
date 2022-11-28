import {DateFormatter} from "./DateFormatter";
import {Field, FieldError, FormError} from "../../components/form/Form";

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
class Validator {

    /**
     * Валидация полей формы. Принимает список полей,
     * возвращает список ошибок, если ошибок нет - пустой список.
     *
     * @param {Field[]} fields список полей
     * @return список ошибок
     */
    public validateFields(fields: Field[]): FieldError[] {
        let errorList: FieldError[] = [];

        fields.forEach((field) => {
            errorList = errorList.concat(this.validateField(field));
        });

        return errorList;
    }

    /**
     * Валидация поля. Принимает поле, возвращает список ошибок,
     * если ошибок нет - пустой список.
     *
     * @param {Field} field поле из формы
     * @return список ошибок
     */
    public validateField(field: Field): FieldError[] {
        let errorList: FieldError[] = [];

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
     * @return undefined если ошибки нет, fieldError - в случае ошибки
     */
    public emptyValidator = (field: Field): FieldError => {
        let result = undefined;

        if (field.field.props.value === '' ||
            field.field.props.value === undefined ||
            field.field.props.value === null) {
            result = {field: field.field.props.name, message: validationErrorsText.INVALID_EMPTY_FIELD_TEXT};
        }

        return result
    }

    /**
     * Метод проверки на содержание только
     * положительных значений.
     *
     * @param {Field} field числовое поле
     * @return undefined если ошибки нет, fieldError - в случае ошибки
     */
    public numberValidator = (field: Field): FieldError => {
        let result = undefined;

        if (!String(field.field.props.value).match(NUMBER_REGEX)) {
            result = {field: field.field.props.name, message: validationErrorsText.INVALID_NUMBER_POSITIVE_TEXT};
        }

        return result
    }

    /**
     * Метод проверки поля на соответствие даты шаблону YYYY-MM-DD.
     *
     * @param {Field} field поле даты
     * @return undefined если ошибки нет, fieldError - в случае ошибки
     */
    public dateFormatValidator = (field: Field): FieldError => {
        let result = undefined;

        if (DateFormatter.getDateFromStr(field.field.props.value) === null) {
            result = {field: field.field.props.name, message: validationErrorsText.INVALID_DATE_TEXT};
        }

        return result
    }


    /**
     * Метод проверки полей на корректный промежуток дат,
     * дата начала не должна быть позже даты окончания
     *
     * @param {string} dateOne дата  начала
     * @param {string} dateTwo дата окончания
     * @return пустой список если ошибки нет, список ошибок - если есть
     */
    public lessOrEqualValidator = (dateOne: string, dateTwo: string): FormError[] => {
        let result: FormError[] = [];
        const secondDate = DateFormatter.getDateFromStr(dateTwo);
        const firstDate = DateFormatter.getDateFromStr(dateOne);

        if (firstDate > secondDate) {
            result = [{message: validationErrorsText.INVALID_DATE_RANGE_TEXT}];
        }

        return result;
    }
}

export const validator = new Validator();
