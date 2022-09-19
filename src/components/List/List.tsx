import React, {ReactNode} from 'react';
import "./List.scss";

export type ListData<T> = {
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
    console.log(values)
    const listFill =
        <div className="list">
            {/*Заголовок списка*/}
            <div className="listHeader">
                {
                    listData.map(({label}, index) =>
                        <div key={index}>{label}</div>)
                }
            </div>
            {/*Значения списка*/}
            {
                values.map((value, index) =>
                    // Каждый сотрудник
                    <div key={index} className="listItem">
                        {
                            // Его значения
                            listData.map(({label, getValueList}, index) =>
                                <div key={index}>
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