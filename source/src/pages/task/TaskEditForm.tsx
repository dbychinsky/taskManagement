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
import {ErrorList, FieldList} from "../../support/typeListForAllApp";
import {Task, TaskStatus} from "../../model/Task";
import {ConvertDate} from "../../support/util/convertDate";

/**
 * Страница обновления/добавления задачи, является общей для страниц
 * задач и проектов(используется при создании Задачи из страницы проектов).
 */

/**
 * Тип для сериализованной модели Задач
 */
export type TaskFormData = {
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
    endDate: string,

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

    const [taskFormData, setTaskFormData] = useState(taskSerialize(task));

    /**
     * Список полей для обновления/добавления сотрудника:
     * name: имя поля
     * label: текстовое отображение имени поля
     * field: поле
     */
    const fieldList: FieldList[] = [
        {
            name: "status",
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
            name: "name",
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
                required={true}
            />
        },
        {
            name: "executionTime",
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
            name: "startDate",
            label: "Дата начала:",
            field: <InputTextField
                type="text"
                value={taskFormData.startDate}
                changeHandler={sendToStateTaskList}
                name="startDate"
                placeholder="YYYY.MM.DD"
                maxLength={10}
                required={true}
                isValidDatePositive={true}
            />
        },
        {
            name: "endDate",
            label: "Дата окончания:",
            field: <InputTextField
                type="text"
                value={taskFormData.endDate}
                changeHandler={sendToStateTaskList}
                name="endDate"
                placeholder="YYYY.MM.DD"
                maxLength={10}
                required={true}
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
    const [errorList, setErrorList] = useState<ErrorList[]>(
        fieldList.map(elem => {
            return {name: elem.field.props.name, isValid: true, errorMessage: ''}
        }));

    /**
     * Список информационных сообщений для всей формы (ошибок)
     */
    const [feedBackFormList, setFeedBackFormList] = useState<FormFeedback[]>([{
        isValid: null,
        errorMessage: ''
    }]);

    /**
     * Сериализация задач. Переводим данные с сервера в нужное
     * представление для работы в форме
     */
    function taskSerialize(task: Task): TaskFormData {
        return Object.assign({} as TaskFormData, task, {
            startDate: ConvertDate.getStrFromDate(task.startDate),
            endDate: ConvertDate.getStrFromDate(task.endDate),
        });
    }

    /**
     * Десериализация задач. Приводим данные к виду модели
     * для отправки на сервер (и добавляем id)
     */
    function taskDeserialize(taskFormData: TaskFormData): Task {
        const targetId: string = task.id ? task.id : Date.now().toString();

        return Object.assign(new Task(), taskFormData, {
            startDate: ConvertDate.getDateFromStr(taskFormData.startDate),
            endDate: ConvertDate.getDateFromStr(taskFormData.endDate),
            id: targetId
        })
    }

    /**
     * Метод для добавления задачи, вызываемый при нажатии кнопки "Сохранить",
     * если все поля формы валидны, валидируем поля дат (корректность промежутка),
     * отправляем данные на сервер
     */
    const submitForm = () => {
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
                      onSubmitForm={submitForm}
                      onCancel={onCancel}/>
            </div>
        </div>
    );
};

export default TaskEditForm;