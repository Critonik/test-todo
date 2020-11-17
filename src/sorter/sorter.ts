import { IToDoItem } from '../types/ITodoItem';

export const sorterDesc = (item: IToDoItem) => {
    return item.status ? 1 : -1
}

export const sorterASC = (item: IToDoItem) => {
    return  item.status ? -1 : 1
}