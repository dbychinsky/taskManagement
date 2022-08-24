import {Project} from "../../model/Project";

// Интерфейс для сервиса проектов
export interface IProjectServer {

    getProjects(): Project[];

    deleteProject(id: string): void;

    saveProject(project: Project): void;

}



