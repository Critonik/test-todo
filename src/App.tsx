import React, { useEffect, useState } from 'react';
import ToDoItem from './components/ToDoItem/ToDoItem';
import Input from './components/Input/Input';
import { IToDoItem } from './types/ITodoItem';
import './App.scss';
import Filter from './components/Filter/Filter';
import { sorterASC, sorterDesc } from './sorter/sorter';

let saveTodos: IToDoItem[] = [];
let saveGarbage: IToDoItem[] = [];

const App: React.FC = () => {

    const [items, setItems] = useState<IToDoItem[]>([]);
    const [garbage, setGarbage] = useState<IToDoItem[]>([]);

    const saveStateBeforeUnload = () => {
        localStorage.setItem('todos', JSON.stringify(saveTodos));
        localStorage.setItem('garbage', JSON.stringify(saveGarbage));
    }


    useEffect(() => {
        if (window !== undefined) {
            window.addEventListener('beforeunload', saveStateBeforeUnload);
            window.addEventListener('unload', saveStateBeforeUnload);
        }
        const setStateOnUnmount = () => {
            const items = localStorage.getItem('todos');
            const garbage = localStorage.getItem('garbage');
            if (items) {
                try {
                    const parsedData = JSON.parse(items);
                    setItems(parsedData);
                    saveTodos = parsedData;
                } catch (e) {
                    console.log('failed')
                }
            }
            if (garbage) {
                try {
                    const parsedData = JSON.parse(garbage);
                    setGarbage(parsedData);
                    saveGarbage = parsedData;
                } catch (e) {
                    console.log('failed')
                }
            }
        }
        setStateOnUnmount();
        return () => {
            if (window !== undefined) {
                window.removeEventListener('beforeunload', saveStateBeforeUnload);
                window.removeEventListener('unload', saveStateBeforeUnload);
            }
        }
    }, []); // eslint-disable-line

    const filterFunc = (type: string) => {
        switch (type) {
            case 'ASC':
                const sortAsc = [...items].sort(sorterASC);
                setItems(sortAsc);
                break;
            case 'DESC':
                const sortDesc = [...items].sort(sorterDesc);
                setItems(sortDesc);
                break;
            case 'OFFLINE':
            default:
                setItems([...saveTodos]);
                break;
        }
    }


    const addNewItem = (text: string) => {
        const newItems = [...items];
        newItems.push({
            title: text,
            status: false
        });
        setItems(newItems);
        saveTodos = newItems;
    }

    const markAsDone = (id: number) => {
        const newItems = [...items];
        newItems[id].status = !newItems[id].status;
        setItems(newItems);
        saveTodos = newItems
    }

    const removeTask = (id: number) => {
        const oldItems = [...items];
        const oldGarbage = [...garbage];
        const deletedItems = oldItems.splice(id, 1);
        oldGarbage.push(...deletedItems);
        setItems(oldItems);
        setGarbage(oldGarbage);
        saveTodos = oldItems;
        saveGarbage = oldGarbage;
    }

    const restoreItem = (id: number) => {
        const oldItems = [...items];
        const oldGarbage = [...garbage];
        const restoreItems = oldGarbage.splice(id, 1);
        oldItems.push(...restoreItems);
        setItems(oldItems);
        setGarbage(oldGarbage);
        saveTodos = oldItems;
        saveGarbage = oldGarbage;
    }



    const createItems = (item: IToDoItem, idx: number) => {
        return (
            <ToDoItem
                title={item.title}
                status={item.status}
                doneAction={markAsDone}
                deleteAction={removeTask}
                key={idx}
                num={idx + 1}
            />
        )
    }


    const createGarbageItem = (item: IToDoItem, idx: number) => {
        return (
            <ToDoItem
                title={item.title}
                status={item.status}
                doneAction={restoreItem}
                deleteAction={() => null}
                key={idx}
                num={idx + 1}
                isGarbage={true}
            />
        )
    }

    const clearGarbage = () => {
        setGarbage([]);
        saveGarbage = [];
    }

    return (
        <div className="App">
            <h1 className={'app-title'}>Todo list</h1>
            <section className={'item-wrapper'}>
                <Input onFinish={addNewItem}/>
                <Filter
                    callBack={filterFunc}
                />
                {items.map(createItems)}
            </section>
            <h1 className={'app-title'}>Deleted</h1>
            <section className={'item-wrapper'}>
                <button
                    className={'reset-button'}
                    onClick={clearGarbage}
                >
                    Remove all
                </button>
                {garbage.map(createGarbageItem)}
            </section>
        </div>
    );
}

export default App;
