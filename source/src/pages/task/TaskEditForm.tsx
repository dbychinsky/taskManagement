import React, {ChangeEvent, useState} from 'react';
import {TaskStatuses} from "./TaskStatus";
import InputTextField from "../../components/fields/inputTextField/InputTextField";
import {Project} from "../../model/Project";
import {Employee} from "../../model/Employee";
import '../../components/fields/comboboxField/Combobox.scss';
import ComboboxField from "../../components/fields/comboboxField/ComboboxField";
import Header from "../../components/header/Header";
import Form, {Error, Field, FeedbackForm} from "../../components/form/Form";
import InputNumberField from "../../components/fields/inputNumberField/InputNumberField";
import {validate} from "../../support/util/Validate";
import {Task, TaskStatus} from "../../model/Task";
import {DateFormatter} from "../../support/util/DateFormatter";

/**
 * Страница обновления/добавления задачи, является общей для страниц
 * задач и проектов(используется при создании Задачи из страницы проектов).
 */

/**
 * Тип для сериализованной модели Задач
 */
export type TaskForm = {

    /**
     * Статус задачи
     */
    status: TaskStatus,

    /**
     * Имя задачи
     */
    name: string,

    /**
     * Уникальный идентификатор проекта задачи
     */
    projectId: string,

    /**
     * Количество часов
     */
    executionTime: string,

    /**
     * Дата начала задачи
     */
    startDate: string,

    /**
     * Дата окончания задачи
     */
    finishDate: string,

    /**
     * Уникальный идентификатор сотрудника задачи
     */
    employeeId: string
}


type ITaskFormProps = {

    /**
     * Задача
     */
    task: Task,

    /**
     * Список проектов
     */
    projectList: Project[],

    /**
     * Список сотрудников
     */
    employeeList: Employee[],

    /**
     * Метод вызываемый при сохранении формы
     *
     * @param task задача
     */
    onPushStorage: (task: Task) => void,

    /**
     * Метод вызываемый при отмене для формы
     *
     * @param value определяет необходимсоть условного
     * рендера
     */
    onCancel: (value: boolean) => void,

    /**
     * Определяет редактируется ли задача, принадлежащая
     * проекту
     */
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

    /**
     * Установка задач в состояние
     */
    const [taskFormData, setTaskFormData] = useState(createTaskForm(task));
    function createTaskForm(task: Task): TaskForm {
        return Object.assign({} as TaskForm, task, {
            startDate: DateFormatter.getStrFromDate(task.startDate),
            finishDate: DateFormatter.getStrFromDate(task.finishDate),
        });
    };

    /**
     * Список полей для обновления/добавления сотрудника:
     *
     * name: имя поля
     * label: текстовое отображение имени поля
     * field: поле
     */
    const fieldList: Field[] = [
        {
            name: "status",
            label: "Статус:",
            field: <ComboboxField
                changeHandler={sendToStateTaskList}
                valueList={TaskStatuses}
                value={taskFormData.status}
                name="status"
                isRequired={true}
            />
        },
        {
            name: "name",
            label: "Наименование:",
            field: <InputTextField
                type="text"
                value={taskFormData.name}
                changeHandler={sendToStateTaskList}
                name="name"
                maxLength={MAX_LENGTH}
                isRequired={true}
            />
        },
        {
            name: "project",
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
                disabled={sourceTaskForProject ? true : false}
                isRequired={true}
            />
        },
        {
            name: "executionTime",
            label: "Работа:",
            field: <InputNumberField
                type="text"
                value={taskFormData.executionTime}
                changeHandler={sendToStateTaskList}
                name="executionTime"
                maxLength={MAX_LENGTH}
                isRequired={true}
                isNumberPositive={true}
            />
        },

        {
            name: "startDate",
            label: "Дата начала:",
            field: <InputTextField
                type="text"
                value={taskFormData.startDate}
                changeHandler={sendToStateTaskList}
                name="startDate"
                placeholder="YYYY.MM.DD"
                maxLength={10}
                isRequired={true}
                isValidDatePositive={true}
            />
        },
        {
            name: "finishDate",
            label: "Дата окончания:",
            field: <InputTextField
                type="text"
                value={taskFormData.finishDate}
                changeHandler={sendToStateTaskList}
                name="finishDate"
                placeholder="YYYY.MM.DD"
                maxLength={10}
                isRequired={true}
                isValidDatePositive={true}
            />
        },
        {
            name: "employee",
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
                isRequired={false}
            />
        }
    ];

    /**
     * Метод для установки в состояние данных из полей формы
     */
    function sendToStateTaskList(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
        setTaskFormData({...taskFormData, [e.target.name]: e.target.value});
    };

    /**
     * Метод для формирования списка ошибок на основе полей формы
     * и добавление их в состояние
     */
    const [errorList, setErrorList] = useState<Error[]>(
        fieldList.map(elem => {
            return {name: elem.field.props.name, isValid: true, errorMessage: ''}
        }));

    /**
     * Список информационных сообщений для всей формы (ошибок)
     */
    const [feedBackFormList, setFeedBackFormList] = useState<FeedbackForm[]>([{
        isValid: null,
        errorMessage: ''
    }]);

    /**
     * Метод для добавления задачи, вызываемый при нажатии кнопки "Сохранить",
     * если все поля формы валидны, валидируем поля дат (корректность промежутка),
     * отправляем данные на сервер
     */
    const submitForm = () => {
        const isValidFormField = validate.checkFieldList(fieldList, errorList)
        setErrorList(isValidFormField => [...isValidFormField]);

        if (validate.isValidForm(errorList)) {
            const startDate: string = fieldList.find((elem) => elem.field.props.name === "startDate").field.props.value;
            const finishDate: string = fieldList.find((elem) => elem.field.props.name === "finishDate").field.props.value;
            const isValidFeedBackFormList = validate.isDateInRange(startDate, finishDate, feedBackFormList);

            setFeedBackFormList(isValidFeedBackFormList => [...isValidFeedBackFormList]);

            if (feedBackFormList.find(element => element.isValid === true)) {
                onPushStorage(createTaskServer(taskFormData));
            }

        } else console.log('Форма не валидна');
    };

    /**
     * Метод подготовки задачи для отправки на сервер.
     *
     * @param {TaskForm} taskFormData задача
     */
    function createTaskServer(taskFormData: TaskForm): Task {
        return Object.assign(new Task(), taskFormData, {
            startDate: DateFormatter.getDateFromStr(taskFormData.startDate),
            finishDate: DateFormatter.getDateFromStr(taskFormData.finishDate)
        });
    };

    return (
        <div className="taskForm">
            <Header title="Задача" isShowButton={false}/>
            <div className="content">
                <Form fieldList={fieldList}
                      feedBackForm={feedBackFormList}
                      errorList={errorList}
                      onSubmitForm={submitForm}
                      onCancel={onCancel}/>
            </div>
        </div>
    );
};

export default TaskEditForm;