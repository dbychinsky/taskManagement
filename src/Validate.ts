// МАСКИ
// Положительные числа
export const numberPositive = /^[1-9]\d*$/
// Буквы
export const lettersPositive = /^[а-яa-zА-ЯA-Z][а-яa-zA-ZА-Я\s]*$/
// Формат даты
export const datePositive = /^\d{4}-\d{2}-\d{2}$/


// Метод проверки на буквы и дефис

const text = ' только буквы и дефис'

export const getErrorOnlyLetters = (fieldName: string) => `${fieldName} ${text}`

export const onlyLettersAndHyphenValidator = (fieldName: string, value: string) => {
    if (!value.match(lettersPositive)) {
        return getErrorOnlyLetters(fieldName)
    }
}