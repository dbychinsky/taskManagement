// Тексты ошибок
export const isValidEmptyFieldText: string = `Поле обязательно к заполнению`
export const isValidLetterPositiveText: string = `Допускаются только буквы`
export const isValidNumberPositiveText: string = `Допускаются только положительные символы`

// МАСКИ
// Положительные числа
export const numberPositive = /^[1-9]\d*$/
// Буквы
export const lettersPositive = /^[а-яa-zА-ЯA-Z][а-яa-zA-ZА-Я\s]*$/
// Формат даты
export const datePositive = /^\d{4}-\d{2}-\d{2}$/

// МЕТОДЫ
// Проверка на пустоту
export const isValidEmptyField = (text: string): boolean => {
    return (text !== '' && text !== null);
};

// Проверка на положительное число
export const isValidNumberPositive = (count: number): boolean => {
    if (String(count).match(numberPositive)) {
        return true
    }
};

// Проверка на буквы
export const isValidLetterPositive = (text: string): boolean => {
    if (text.match(lettersPositive)) {
        return true
    }
};
