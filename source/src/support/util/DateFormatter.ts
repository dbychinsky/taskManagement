/**
 * Конвертация даты
 */
export class DateFormatter {

    /**
     * Метод получения строки из даты
     *
     * @param {Date} date дата формата Date
     * @return дата формата String
     */
    static getStrFromDate = (date?: Date): string => {
        let result = ''

        if (date !== null) {
            if (!isNaN(date.getTime())) {
                result = date.toISOString().slice(0, 10);
            }
        }

        return result
    }

    /**
     * Метод получения даты из строки
     *
     * @param {string} dateString дата формата String
     * @return дата формата Date
     * @return возвращает null
     */
    static getDateFromStr = (dateString: string): Date | null => {
        let result = null

        if (dateString.length >= 10) {
            if (new Date(dateString))
                result = new Date(dateString)
        }

        return result;
    }

    /**
     * Метод отображения даты в локальном виде DD.MM.YYYY
     *
     * @param {string} dateString дата формата String
     * @return дата в формате DD.MM.YYYY
     */
    static getLocaleDateStr = (dateString: string): string => {
        return dateString.replace(/^(\d+)-(\d+)-(\d+)$/, `$3.$2.$1`);
    }
}
