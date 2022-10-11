/**
 * Класс объекта Проект
 */
export class Project {

    /**
     * Уникальный идентификатор проекты
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
