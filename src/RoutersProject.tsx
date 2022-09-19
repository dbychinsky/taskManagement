import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import ProjectList from "./pages/project/ProjectList";
import ProjectEdit from "./pages/project/ProjectEdit";
import TaskList from "./pages/task/TaskList";
import EmployeeList from "./pages/employee/EmployeeList";
import React from "react";
import TaskEdit from "./pages/task/TaskEdit";
import EmployeeEdit from "./pages/employee/EmployeeEdit";

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
                <Route index element={<ProjectList/>}/>
                <Route path={PROJECT_FORM_PATH} element={<ProjectEdit/>}/>
                <Route path={PROJECT_ID_PATH} element={<ProjectEdit/>}/>
            </Route>

            <Route path={TASK_PAGE_PATH}>
                <Route index element={<TaskList/>}/>
                <Route path={TASK_FORM_PATH} element={<TaskEdit/>}/>
                <Route path={TASK_ID_PATH} element={<TaskEdit/>}/>
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
