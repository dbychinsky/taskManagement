import React, {ChangeEvent, useState} from 'react';
import {Employee} from "../../model/Employee";
import {useNavigate, useParams} from "react-router-dom";
import {server} from "../../app";
import {Task} from "../../model/Task";
import {Project} from "../../model/Project";
import TaskEditForm from "./TaskEditForm";


const TaskEdit = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    const initialProjectList = server.getProjects();
    const initialEmployeeList = server.getEmployees();

    // Получаем таску для редактирования
    // const initialTask: task = requestTask(id);

    const [task, setTasks] = useState(requestTask(id));
    const [projectList, setProjectList] = useState<Project[]>(initialProjectList);
    const [employeeList, setEmployeeList] = useState<Employee[]>(initialEmployeeList);

    // Запрашиваем таску или создаем новую
    function requestTask(id: string): Task {
        const target = server.getTasks().find((tasks: Task) => tasks.id === id);
        if (target) {
            return target
        } else return new Task();
    }

    const save = (task: Task) => {
        server.saveTask(task);
        navigate(-1);
    };

    const cancel = () => {
        navigate(-1);
    };

    return <TaskEditForm
        task={task}
        employeeList={employeeList}
        projectList={projectList}
        onPushStorage={save}
        onCancel={cancel}
    />
};

export default TaskEdit;