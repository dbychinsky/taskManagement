/**
 * Интерфейс, определяет поля объекта проекта
 */
export class Project {
    /**
     * Уникальный идентификатор проекта
     */
    id?: string;
    /**
     * Имя проекта
     */
    name: string;
    /**
     * Описание проекта
     */
    description: string;

    constructor() {
        this.id = '';
        this.name = '';
        this.description = '';

    }
}
