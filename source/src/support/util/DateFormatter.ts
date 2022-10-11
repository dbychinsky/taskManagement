/**
 * Конвертация даты
 */
export class DateFormatter {

    /**
     * Метод получения строки из даты
     *
     * @param {Date} date дата формата Date
     * @return {string} дата формата String
     */
    static getStrFromDate = (date?: Date): string => {
        if (date !== null) {
            if (!isNaN(date.getTime())) {
                return date.toISOString().slice(0, 10);
            }
        }
        return '';
    }

    /**
     * Метод получения даты из строки
     *
     * @param {string} dateString дата формата String
     * @return {date|null} дата формата Date
     */
    static getDateFromStr = (dateString: string): Date | null => {
        if (dateString) {
            if (dateString.length >= 10) {
                return new Date(dateString)
            }
        }
        return null;
    }

    /**
     * Метод отображения даты в локальном виде DD.MM.YYYY
     *
     * @param {string} dateString дата формата String
     * @return {string} дата в формате DD.MM.YYYY
     */
    static getLocaleDateStr = (dateString: string): string => {
        return dateString.replace(/^(\d+)-(\d+)-(\d+)$/, `$3.$2.$1`);
    }
}
