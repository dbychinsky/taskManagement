import React, {ChangeEvent, useState} from 'react';
import {TaskStatuses} from "./TaskStatus";
import InputTextField from "../../components/fields/inputTextField/InputTextField";
import {Project} from "../../model/Project";
import {Employee} from "../../model/Employee";
import '../../components/fields/comboboxField/Combobox.scss';
import ComboboxField from "../../components/fields/comboboxField/ComboboxField";
import Header from "../../components/header/Header";
import Form, {Field, FieldError, FormError} from "../../components/form/Form";
import InputNumberField from "../../components/fields/inputNumberField/InputNumberField";
import {validator} from "../../support/util/Validator";
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

    /**
     * Установка задач в состояние
     */
    const [taskFormData, setTaskFormData] = useState(createTaskForm(task));

    function createTaskForm(task: Task): TaskForm {
        return Object.assign({} as TaskForm, task, {
            startDate: DateFormatter.getStrFromDate(task.startDate),
            endDate: DateFormatter.getStrFromDate(task.endDate),
        });
    };

    /**
     * Метод получения значения формы
     *
     * @param key ключ
     */
    // const getFieldValue = (fieldList: Field[], key: string): string => {
    //     return fieldList.find((elem) => elem.name === key).field.props.value
    // }

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
            />,
            validationList: [validator.emptyValidator]
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
            />,
            validationList: [validator.emptyValidator]
        },
        {
            name: "projectId",
            label: "Наименование проекта:",
            field: <ComboboxField
                changeHandler={sendToStateTaskList}
                valueList={
                    projectList.map((project) => {
                        return {statusId: project.id, statusText: project.name}
                    })
                }
                value={sourceTaskForProject ? 's' : taskFormData.projectId}
                name="projectId"
                disabled={sourceTaskForProject ? true : false}
                optionDefaultValue={sourceTaskForProject ? 'Текущий проект' : ''}
            />,
            validationList: [validator.emptyValidator]
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
            />,
            validationList: [
                validator.emptyValidator,
                validator.numberValidator]
        },

        {
            name: "startDate",
            label: "Дата начала:",
            field: <InputTextField
                type="text"
                value={taskFormData.startDate}
                changeHandler={sendToStateTaskList}
                name="startDate"
                placeholder="ГГГГ-ММ-ДД"
                maxLength={10}
            />,
            validationList: [
                validator.emptyValidator,
                validator.dateFormatValidator
            ]
        },
        {
            name: "endDate",
            label: "Дата окончания:",
            field: <InputTextField
                type="text"
                value={taskFormData.endDate}
                changeHandler={sendToStateTaskList}
                name="endDate"
                placeholder="ГГГГ-ММ-ДД"
                maxLength={10}
            />,
            validationList: [
                validator.emptyValidator,
                validator.dateFormatValidator]

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
            />,
            validationList: []
        }
    ];

    /**
     * Метод для установки в состояние данных из полей формы
     */
    function sendToStateTaskList(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
        setTaskFormData({...taskFormData, [e.target.name]: e.target.value});
    };

    /**
     * Формирование списка ошибок на основе полей формы
     * и добавление их в состояние
     */
    const [fieldErrorList, setFieldErrorList] = useState<FieldError[]>(
        fieldList.map(elem => {
            return {field: elem.field.props.name, message: ''}
        }));

    /**
     * Сообщение об ошибке к форме
     */
    const [formError, setFormError] = useState<FormError[]>();

    /**
     * Метод для добавления задачи, вызываемый при нажатии кнопки "Сохранить",
     * если все поля формы валидны, валидируем поля дат (корректность промежутка),
     * отправляем данные на сервер
     */
    const submitForm = () => {
        const errorList = validator.validateFields(fieldList);
        setFieldErrorList(errorList);

        if (!errorList.length) {
            const error = validator.lessOrEqualValidator(taskFormData.startDate, taskFormData.endDate);
            setFormError(error);

            if (!error.length) {
                onPushStorage(createTaskServer(taskFormData));
            }
        }
    };

    /**
     * Метод подготовки задачи для отправки на сервер.
     *
     * @param {TaskForm} taskFormData задача
     */
    function createTaskServer(taskFormData: TaskForm): Task {
        return Object.assign(new Task(), taskFormData, {
            startDate: DateFormatter.getDateFromStr(taskFormData.startDate),
            endDate: DateFormatter.getDateFromStr(taskFormData.endDate)
        });
    };

    return (
        <div className="taskForm">
            <Header title="Задача" isShowButton={false}/>
            <div className="content">
                <Form fieldList={fieldList}
                      fieldErrorList={fieldErrorList}
                      formError={formError}
                      onSubmitForm={submitForm}
                      onCancel={onCancel}/>
            </div>
        </div>
    );
};

export default TaskEditForm;