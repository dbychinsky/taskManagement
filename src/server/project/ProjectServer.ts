import {Project} from "../../model/Project";
import {IProjectServer} from "./IProjectServer";

class ProjectServer implements IProjectServer {

    readonly PROJECT_LIST_KEY = 'PROJECT_LIST_KEY';

    deleteProject(id: string): void {
        const projectList = this.getProjects();
        const newProjectList = projectList.filter((project: Project) => project.id !== id);
        this.save('PROJECT_LIST_KEY', newProjectList);
    }

    getProjects(): Project[] {
        const result = this.load(this.PROJECT_LIST_KEY);
        // TODO подумать что с этим делать, проверка если файла localstorage не существует
        if (result === null) {
            return []
        }
        return result;
    }

    saveProject(project: Project): void {
        let projects: Project[] = this.getProjects();
        projects.push(project);
        this.save(this.PROJECT_LIST_KEY, projects);
    }

    private load(PROJECT_LIST_KEY: string) {
        return JSON.parse(localStorage.getItem(PROJECT_LIST_KEY)!);
    }

    private save(PROJECT_LIST_KEY: string, object: any) {
        localStorage.setItem(PROJECT_LIST_KEY, JSON.stringify(object));
    }
}

export const projectServer = new ProjectServer();
