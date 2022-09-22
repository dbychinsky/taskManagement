import React, {ReactNode} from 'react';
import "./List.scss";

/**
 * Компонент List, принимает массив данных для рендера,
 * Мапит заголовок списка listHeader, далее мапит данные
 * в виде строк listItem.
 */

export type ListData<T> = {
    // название поля
    name: string
    // Название (Заголовок)
    label: string,
    // Метод для отображения данных в строке (Значение)
    getValueList: (value: T) => ReactNode
}

interface IListProps<T> {
    // Массив данных
    listData: ListData<T>[],
    // Их значения
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
        values.length ? listFill : listEmpty
    );
};

export default List;