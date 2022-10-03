import React, {ReactNode} from 'react';
import "./List.scss";

/**
 * Компонент List, принимает массив данных для отображения,
 * формирует заголовок для списка с именами полей (listHeader),
 * формирует список данных в виде строк(listItem).
 */

export type ListData<T> = {
    /**
     * Имя поля
     */
    name: string
    /**
     * Имя поля для отображения на кирилице
     */
    label: string,
    /**
     * Метод для получения и отображения данных в строке
     * @param value значение в ячейке
     */
    getValueList: (value: T) => ReactNode
}

interface IListProps<T> {
    /**
     * Массив строк
     */
    listData: ListData<T>[],
    /**
     * Массив значений (данных)
     */
    values: T[]
}

const List = <T, >({listData, values}: IListProps<T>) => {
    const listFill =
        <div className="list">
            {/*Заголовок списка*/}
            <div className="listHeader">
                {
                    listData.map(({name, label}, index) =>
                        <div key={index} className={name}>{label}</div>)
                }
            </div>
            {/*Значения списка*/}
            {
                values.map((value, index) =>
                    // Каждый сотрудник
                    <div key={index} className="listItem">
                        {
                            // Его значения
                            listData.map(({label, name, getValueList}, index) =>
                                <div key={index} className={name}>
                                    <span className="value">{getValueList(value)}</span>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>

    const listEmpty =
        <p className="listEmpty">Список пуст</p>

    return (
        // Проверка: если значение отстутствует - выводим сообщение
        values.length ? listFill : listEmpty
    );
};

export default List;