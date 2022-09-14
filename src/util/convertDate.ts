// Конвертация даты
export class ConvertDate {

    // Получаем строку из даты
    static getStrFromDate = (date?: Date): string => {
        return date ? date.toString().split('T')[0] : ''
        // const dateStr = date ? date.toString().split('T')[0] : ''
        // return dateStr.replace(/^(\d+)-(\d+)-(\d+)$/, `$3.$2.$1`);
    }

    // Получаем дату из строки
    static getDateFromStr = (dateString: string): Date => {
        return new Date(dateString)
    }
}
