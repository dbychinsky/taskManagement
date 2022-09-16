// Конвертация даты
export class ConvertDate {

    // Получаем строку из даты
    static getStrFromDate = (date?: Date): string => {
        if (date !== null) {
            if (!isNaN(date.getTime())) {
                return date.toISOString().slice(0, 10);
            }
        }
        return '';
    }

    // Получаем дату из строки
    static getDateFromStr = (dateString: string): Date | null => {
        if (dateString) {
            if (dateString.length >= 10) {
                return new Date(dateString)
            }
        }
        return null;
    }
}
