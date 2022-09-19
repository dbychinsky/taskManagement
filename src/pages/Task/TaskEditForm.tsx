import React, {ChangeEvent, useState} from 'react';
import {TaskStatuses} from "./TaskStatus";
import InputTextField from "../../components/fields/inputTextField/InputTextField";
import {Project} from "../../model/Project";
import {Employee} from "../../model/Employee";
import '../../components/fields/comboboxField/Combobox.scss';
import ComboboxField from "../../components/fields/comboboxField/ComboboxField";
import Header from "../../components/header/Header";
import Form, {FormFeedback} from "../../components/form/Form";
import InputNumberField from "../../components/fields/inputNumberField/InputNumberField";
import {validate} from "../../support/util/validate";
import {ErrorList} from "../../support/type";
import {Task, TaskStatus} from "../../model/Task";
import {ConvertDate} from "../../support/util/convertDate";

export type TaskFormData = {
    status: TaskStatus,
    name: string,
    projectId: string,
    executionTime: string,
    startDate: string,
    endDate: string,
    employeeId: string
}


interface ITaskFormProps {
    task: Task,
    projectList: Project[],
    employeeList: Employee[],
    onPushStorage: (task: Task) => void,
    onCancel: (value: boolean) => void,
    sourceTaskForProject?: boolean
}

const TaskEditForm = (props: ITaskFormProps) => {
    const {
        task,
        projectList,
        employeeList,
        onPushStorage,
        onCancel,
        sourceTaskForProject
    } = props

    const MAX_LENGTH: number = 50;

    const [taskFormData, setTaskFormData] = useState(taskSerialize(task));
    const fieldList = [
        {
            label: "Статус:",
            field: <ComboboxField
                changeHandler={sendToStateTaskList}
                valueList={TaskStatuses}
                value={taskFormData.status}
                name="status"
                required={true}
            />
        },
        {
            label: "Наименование:",
            field: <InputTextField
                type="text"
                // value={task.name ? task.name : ''}
                value={taskFormData.name}
                changeHandler={sendToStateTaskList}
                name="name"
                maxLength={MAX_LENGTH}
                required={true}
            />
        },
        {
            label: "Наименование проекта:",
            field: <ComboboxField
                changeHandler={sendToStateTaskList}
                valueList={
                    projectList.map((project) => {
                        return {statusId: project.id, statusText: project.name}
                    })
                }
                value={taskFormData.projectId}
                name="projectId"
                disabled={sourceTaskForProject? true : false}
                required={true}
            />
        },
        {
            label: "Работа:",
            field: <InputNumberField
                type="text"
                // value={task.executionTime ? task.executionTime : ''}
                value={taskFormData.executionTime}
                changeHandler={sendToStateTaskList}
                name="executionTime"
                maxLength={MAX_LENGTH}
                required={true}
                isValidNumberPositive={true}
            />
        },

        {
            label: "Дата начала:",
            field: <InputTextField
                type="text"
                value={taskFormData.startDate}
                changeHandler={sendToStateTaskList}
                name="startDate"
                maxLength={10}
                required={true}
                isValidDatePositive={true}
            />
        },
        {
            label: "Дата окончания:",
            field: <InputTextField
                type="text"
                value={taskFormData.endDate}
                changeHandler={sendToStateTaskList}
                name="endDate"
                maxLength={10}
                required={true}
                isValidDatePositive={true}
            />
        },
        {
            label: "Исполнитель:",
            field: <ComboboxField
                changeHandler={sendToStateTaskList}
                valueList={
                    employeeList.map((employee) => {
                        return {statusId: employee.id, statusText: employee.fullName}
                    })
                }
                value={taskFormData.employeeId}
                name="employeeId"
            />
        }
    ];

    // Установка в состояние данных из полей формы страницы task
    function sendToStateTaskList(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
        setTaskFormData({...taskFormData, [e.target.name]: e.target.value});
    };

    // Формируем список ошибок на основе списка полей формы
    const [errorList, setErrorList] = useState<ErrorList[]>(
        fieldList.map(elem => {
            return {name: elem.field.props.name, isValid: true, errorMessage: ''}
        }));

    const [feedBackFormList, setFeedBackFormList] = useState<FormFeedback[]>([{
        isValid: null,
        errorMessage: ''
    }]);


    // Переводим данные с сервера нужное представление для работы в форме
    function taskSerialize(task: Task): TaskFormData {
        return Object.assign({} as TaskFormData, task, {
            startDate: ConvertDate.getStrFromDate(task.startDate),
            endDate: ConvertDate.getStrFromDate(task.endDate),
        });
    }

    // Приводим данные к виду модели ля отправки на сервер (и добавляем id)
    function taskDeserialize(taskFormData: TaskFormData): Task {
        const targetId: string = task.id ? task.id : Date.now().toString();

        return Object.assign(new Task(), taskFormData, {
            startDate: ConvertDate.getDateFromStr(taskFormData.startDate),
            endDate: ConvertDate.getDateFromStr(taskFormData.endDate),
            id: targetId
        })
    }

    const onSubmitForm = () => {
        // Валидация полей формы

        const isValidFormField = validate.validateField(fieldList, errorList)
        setErrorList(isValidFormField => [...isValidFormField]);

        if (validate.isValidForm(errorList)) {
            // Если все поля валидны, проверям поля дат между собой
            const isValidFeedBackFormList = validate.validDateRange(fieldList, feedBackFormList)
            setFeedBackFormList(isValidFeedBackFormList => [...isValidFeedBackFormList]);

            if (feedBackFormList.find(element => element.isValid === true)) {
                onPushStorage(taskDeserialize(taskFormData));
            }

        } else console.log('Форма не валидна');
    }

    return (
        <div className="taskForm">
            <Header title="Задача" isShowButton={false}/>
            <div className="content">
                <Form fieldList={fieldList}
                      feedBackForm={feedBackFormList}
                      errorList={errorList}
                      onSubmitForm={onSubmitForm}
                      onCancel={onCancel}/>
            </div>
        </div>
    );
};

export default TaskEditForm;