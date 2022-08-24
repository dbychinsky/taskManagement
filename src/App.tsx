import React from 'react';
import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import ProjectsPage from "./pages/ProjectsPage";
import Navigation from "./components/Navigation/Navigation";
import {EMPLOYEE_FORM, EMPLOYEES_PAGE, PROJECT_FORM, PROJECTS_PAGE, ROOT_PATH, TASK_FORM, TASK_PAGE} from "./Paths";
import ProjectForm from "./components/Project/ProjectForm";
import EmployeesPage from "./pages/EmployeesPage";
import EmployeeForm from "./components/Employee/EmployeeForm";
import TaskPage from "./pages/TaskPage";
import TaskForm from "./components/Task/TaskForm";

function App() {
    return (
        <div className="App">
            <main className="main">
                <Navigation/>
                <div className="content">
                    <Routes>
                        <Route path={ROOT_PATH} element={<MainPage/>}/>
                        <Route path={PROJECTS_PAGE} element={<ProjectsPage/>}/>
                        <Route path={TASK_PAGE} element={<TaskPage/>}/>
                        <Route path={EMPLOYEES_PAGE} element={<EmployeesPage/>}/>
                        <Route path={`${PROJECTS_PAGE}/${PROJECT_FORM}`} element={<ProjectForm/>}/>
                        <Route path={`${PROJECTS_PAGE}/${PROJECT_FORM}/:id`} element={<ProjectForm/>}/>
                        <Route path={`${TASK_PAGE}/${TASK_FORM}`} element={<TaskForm/>}/>
                        <Route path={`${TASK_PAGE}/${TASK_FORM}/:id`} element={<TaskForm/>}/>
                        <Route path={`${EMPLOYEES_PAGE}/${EMPLOYEE_FORM}`} element={<EmployeeForm/>}/>
                        <Route path={`${EMPLOYEES_PAGE}/${EMPLOYEE_FORM}/:id`} element={<EmployeeForm/>}/>
                    </Routes>
                </div>
            </main>
        </div>
    );
}

export default App;
