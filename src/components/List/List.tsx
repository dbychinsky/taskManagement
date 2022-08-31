import React, {ReactNode} from 'react';
import "./List.scss";

export type ListLine<T> = {
    // Имя строки
    listName: string,
    // Метод для отображения данных в строке
    getValueListLine: (value: T) => ReactNode
}

interface IListProps<T> {
    // Массив данных
    listData: ListLine<T>[],
    // Строка из массива
    values: T[]
}

const List = <T, >({listData, values}: IListProps<T>) => {

    return (
        <div className="list">
            <div className="listHeader">
                {
                    listData.map(({listName}, index) =>
                        <div key={index}>{listName}</div>)
                }
            </div>
            {/*<ul className="listBody">*/}
                {
                    values.map((value, index) =>
                        <div key={index} className="listItem">
                            {
                                listData.map(({listName, getValueListLine}, index) =>
                                    <div key={index}>
                                        <span className="value">{getValueListLine(value)}</span>
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            {/*</ul>*/}
        </div>
    );
};

export default List;