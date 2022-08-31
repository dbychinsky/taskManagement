import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectService from "./components/Project/ProjectService";
import TaskPage from "./pages/TaskPage";
import TaskForm from "./components/Task/TaskForm";
import EmployeesPage from "./pages/EmployeesPage";
import EmployeeForm from "./components/Employee/EmployeeForm";
import React from "react";
import {EmployeeService} from "./components/Employee/EmployeeService";
import TaskService from "./components/Task/TaskService";

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
                <Route path={PROJECT_FORM} element={<ProjectService/>}/>
                <Route path={PROJECT_ID} element={<ProjectService/>}/>
            </Route>

            <Route path={TASK_PAGE}>
                <Route index element={<TaskPage/>}/>
                <Route path={TASK_FORM} element={<TaskService/>}/>
                <Route path={TASK_ID} element={<TaskService/>}/>
            </Route>

            <Route path={EMPLOYEES_PAGE}>
                <Route index element={<EmployeesPage/>}/>
                <Route path={EMPLOYEE_FORM} element={<EmployeeService/>}/>
                <Route path={EMPLOYEE_ID} element={<EmployeeService/>}/>
            </Route>

        </Routes>
    );
};

export default RoutersProject;
