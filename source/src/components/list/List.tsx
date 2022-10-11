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
     *
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

    /**
     * Заголовок списка
     */
    const ListHeader = <div className="listHeader">
        {
            listData.map(({name, label}, index) =>
                <div key={index} className={name}>{label}</div>)
        }
    </div>

    /**
     * Тело списка
     */
    const ListBody =
        <>
            {
                values.map((value, index) =>
                    <div key={index} className="listItem">
                        {
                            listData.map(({label, name, getValueList}, index) =>
                                <div key={index} className={name}>
                                    <span className="value">{getValueList(value)}</span>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </>

    /**
     * Список
     */
    const listFill =
        <div className="list">
            {ListHeader}
            {ListBody}
        </div>

    /**
     * Сообщение при отсутствии данных в списке
     */
    const listEmpty =
        <p className="listEmpty">Список пуст</p>

    return (
        values.length ? listFill : listEmpty
    );
};


export default List;