import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Task} from "../../model/Task";
import TaskListView from "./TaskListView";
import {Employee} from "../../model/Employee";
import {Project} from "../../model/Project";
import {server} from "../../app";
import Header from "../../components/header/Header";
import {TASK_FORM_PATH} from "../../routersProject";

const TaskList = () => {
    const navigate = useNavigate();
    const [taskList, setTaskList] = useState<Task[]>([]);
    const [employeeList, setEmployeeList] = useState<Employee[]>([]);
    const [projectList, setProjectList] = useState<Project[]>([]);

    useEffect(() => {
        setTaskList(server.getTasks());
    }, []);

    useEffect(() => {
        setEmployeeList(server.getEmployees());
    }, []);

    useEffect(() => {
        setProjectList(server.getProjects());
    }, []);

    const add = () => {
        navigate(TASK_FORM_PATH);
    };

    const remove = (id: string) => {
        server.deleteTask(id);
        setTaskList(server.getTasks());
    };

    const update = (id: string) => {
        navigate(id);
    };

    return (
        <div className="taskPage">
            <Header title="Список задач"
                    onClick={add}
                    text="Добавить"
                    isShowButton={true}/>

            <TaskListView
                taskList={taskList}
                employees={employeeList}
                projects={projectList}
                remove={remove}
                update={update}/>
        </div>
    );
};

export default TaskList;