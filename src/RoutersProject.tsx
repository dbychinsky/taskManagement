import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectForm from "./components/Project/ProjectForm";
import TaskPage from "./pages/TaskPage";
import TaskForm from "./components/Task/TaskForm";
import EmployeesPage from "./pages/EmployeesPage";
import EmployeeForm from "./components/Employee/EmployeeForm";
import React from "react";
import TaskEditFromProject from "./components/Task/TaskEditFromProject";

export const ROOT_PATH = "/";
export const PROJECTS_PAGE = 'projectsPage/';
export const PROJECT_FORM = 'projectForm/';
export const PROJECT_ID = ':id';
export const TASK_PAGE = 'taskPage/';
export const TASK_FORM = 'taskForm/';
export const TASK_ID = ':id';
export const EMPLOYEES_PAGE = 'employeesPage/';
export const EMPLOYEE_FORM = 'employeeForm/';
export const EMPLOYEE_ID = ':id/';
export const TASK_FORM_PROJECT = 'taskEditFromProject/';
export const TASK_FORM_PROJECT_ID = ':id/';

const RoutersProject = () => {
    return (
        <Routes>
            <Route path={ROOT_PATH} element={<MainPage/>}/>

            <Route path={PROJECTS_PAGE}>
                <Route index element={<ProjectsPage/>}/>
                <Route path={PROJECT_FORM} element={<ProjectForm/>}/>
                <Route path={PROJECT_ID}>
                    <Route index element={<ProjectForm/>}/>
                    <Route path={TASK_FORM_PROJECT}>
                        <Route index element={<TaskEditFromProject/>}/>
                        <Route path={TASK_FORM_PROJECT_ID} element={<TaskEditFromProject/>}/>
                    </Route>
                </Route>
            </Route>

            <Route path={TASK_PAGE}>
                <Route index element={<TaskPage/>}/>
                <Route path={TASK_FORM} element={<TaskForm/>}/>
                <Route path={TASK_ID} element={<TaskForm/>}/>
            </Route>

            <Route path={EMPLOYEES_PAGE}>
                <Route index element={<EmployeesPage/>}/>
                <Route path={EMPLOYEE_FORM} element={<EmployeeForm/>}/>
                <Route path={EMPLOYEE_ID} element={<EmployeeForm/>}/>
            </Route>

        </Routes>
    );
};

export default RoutersProject;
