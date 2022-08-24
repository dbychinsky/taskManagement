import {Project} from "../model/Project";
import {IProjectServer} from "./project/IProjectServer";

class NetworkServer implements IProjectServer {

    deleteProject(id: string): void {
    }

    getProjects(): Project[] {
        return [];
    }

    saveProject(project: Project): void {
    }
}