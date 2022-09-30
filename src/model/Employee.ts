/**
 * Интерфейс, определяет поля объекта сотрудника
 */

export class Employee {
    /**
     * Уникальный идентификатор сотрудника
     */
    id: string;
    /**
     * Имя сотрудника
     */
    firstName: string;
    /**
     * Фамилия сотрудника
     */
    lastName: string;
    /**
     * Отчество сотрудника
     */
    middleName: string;
    /**
     * Должность сотрудника
     */
    position: string;
    /**
     * Полное имя сотрудника
     */
    fullName: string;

    constructor() {
        this.id = '';
        this.firstName = '';
        this.lastName = '';
        this.middleName = '';
        this.position = '';
        this.fullName = '';
    }
}
