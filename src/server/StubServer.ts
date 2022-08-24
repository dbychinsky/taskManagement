import {Project} from "../model/Project";
import {IProjectServer} from "./project/IProjectServer";

class StubServer implements IProjectServer {
    deleteProject(id: string): void {
    }

    getProjects(): Project[] {
        let projects: Project[] = [];
        return projects;
    }

    saveProject(project: Project): void {
    }
}