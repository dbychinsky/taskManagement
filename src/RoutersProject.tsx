import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import ProjectsList from "./pages/Project/ProjectsList";
import ProjectService from "./pages/Project/ProjectService";
import TaskPage from "./pages/Task/TaskPage";
import EmployeeList from "./pages/Employee/EmployeeList";
import React from "react";
import TaskService from "./pages/Task/TaskService";
import EmployeeEdit from "./pages/Employee/EmployeeEdit";

export const ROOT_PATH = "/";
export const PROJECT_PAGE_PATH = 'projectsPage/';
export const PROJECT_FORM_PATH = 'projectForm/';
export const PROJECT_ID_PATH = ':id';
export const TASK_PAGE_PATH = 'taskPage/';
export const TASK_FORM_PATH = 'taskForm/';
export const TASK_ID_PATH = ':id';
export const EMPLOYEES_PAGE_PATH = 'employeesPage/';
export const EMPLOYEES_FORM_PATH = 'employeeForm/';
export const EMPLOYEES_ID_PATH = ':id/';

const RoutersProject = () => {
    return (
        <Routes>
            <Route path={ROOT_PATH} element={<MainPage/>}/>

            <Route path={PROJECT_PAGE_PATH}>
                <Route index element={<ProjectsList/>}/>
                <Route path={PROJECT_FORM_PATH} element={<ProjectService/>}/>
                <Route path={PROJECT_ID_PATH} element={<ProjectService/>}/>
            </Route>

            <Route path={TASK_PAGE_PATH}>
                <Route index element={<TaskPage/>}/>
                <Route path={TASK_FORM_PATH} element={<TaskService/>}/>
                <Route path={TASK_ID_PATH} element={<TaskService/>}/>
            </Route>

            <Route path={EMPLOYEES_PAGE_PATH}>
                <Route index element={<EmployeeList/>}/>
                <Route path={EMPLOYEES_FORM_PATH} element={<EmployeeEdit/>}/>
                <Route path={EMPLOYEES_ID_PATH} element={<EmployeeEdit/>}/>
            </Route>

        </Routes>
    );
};

export default RoutersProject;
