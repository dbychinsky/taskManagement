// Параметры валидации
export const MaxLength = 20;

// Тексты ошибок
export const isValidStringLengthText: string = `Максимально доустимая длинна текста ${MaxLength}`
export const isValidEmptyFieldText: string = `Поле обязательно к заполнению`

// МАСКИ
// Положительные числа
export const numberPositive = /^[1-9]\d*$/
// Буквы
export const lettersPositive = /^[а-яa-zА-ЯA-Z][а-яa-zA-ZА-Я\s]*$/
// Формат даты
export const datePositive = /^\d{4}-\d{2}-\d{2}$/

// МЕТОДЫ
// Проверка на максимальную длинну
export const isValidStringLength = (
    text: string,
    maxLength = Infinity,
): boolean => {
    return text.length <= maxLength;
};

// Проверка на пустоту
export const isValidEmptyField = (text: string): boolean => {
    return text !== '';
};
