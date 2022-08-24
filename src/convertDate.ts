// Конвертация даты
export class ConvertDate {

    // Получаем строку из даты
    static getDateToString = (date?: Date): string => {
        return date ? date.toISOString().split("T")[0] : ""
    }

    // Получаем дату из строки
    static getStringToDate = (dateString: string): Date => {
        return new Date(dateString)
    }
}