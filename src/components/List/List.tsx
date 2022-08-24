import React, {ReactNode} from 'react';
import "./List.scss";

export type ListLine<T> = {
    // имя строки
    listName: string,
    // Метод для отображения данных в строке
    getValueListLine: (value: T) => ReactNode
}

interface IListProps<T> {
    // массив строк
    listData: ListLine<T>[],
    // массив данных
    values: T[]
}

const List = <T, >({listData, values}: IListProps<T>) => {
    return (
        <ul className="list">
            {
                values?.map((value, index) =>
                    <li key={index} className="listItem">
                        {
                            listData.map(({listName, getValueListLine}, index) =>
                                <div key={index}>
                                    <span className="title">{listName}</span>
                                    <span className="value">{getValueListLine(value)}</span>
                                </div>
                            )
                        }
                    </li>
                )
            }
        </ul>
    );
};

export default List;