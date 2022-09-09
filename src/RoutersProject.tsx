import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectService from "./components/Project/ProjectService";
import TaskPage from "./pages/TaskPage";
import EmployeesPage from "./pages/EmployeesPage";
import React from "react";
import TaskService from "./components/Task/TaskService";
import EmployeeService from "./components/Employee/EmployeeService";

export const RootPath = "/";
export const ProjectPagePath = 'projectsPage/';
export const ProjectFormPath = 'projectForm/';
export const ProjectIdPath = ':id';
export const TaskPagePath = 'taskPage/';
export const TaskFormPath = 'taskForm/';
export const TaskIdPath = ':id';
export const EmployeesPagePath = 'employeesPage/';
export const EmployeesFormPath = 'employeeForm/';
export const EmployeesIdPath = ':id/';

const RoutersProject = () => {
    return (
        <Routes>
            <Route path={RootPath} element={<MainPage/>}/>

            <Route path={ProjectPagePath}>
                <Route index element={<ProjectsPage/>}/>
                <Route path={ProjectFormPath} element={<ProjectService/>}/>
                <Route path={ProjectIdPath} element={<ProjectService/>}/>
            </Route>

            <Route path={TaskPagePath}>
                <Route index element={<TaskPage/>}/>
                <Route path={TaskFormPath} element={<TaskService/>}/>
                <Route path={TaskIdPath} element={<TaskService/>}/>
            </Route>

            <Route path={EmployeesPagePath}>
                <Route index element={<EmployeesPage/>}/>
                <Route path={EmployeesFormPath} element={<EmployeeService/>}/>
                <Route path={EmployeesIdPath} element={<EmployeeService/>}/>
            </Route>

        </Routes>
    );
};

export default RoutersProject;
