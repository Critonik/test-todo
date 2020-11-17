import React from 'react';
import './ToDoItem.scss';

interface IItem {
    title: string;
    status: boolean;
    doneAction: (id: number) => void;
    deleteAction: (id: number) => void;
    num: number;
    isGarbage?: boolean;
}

const ToDoItem: React.FC<IItem> = ({title, deleteAction, status, doneAction, num, isGarbage}) => {
    return (
        <div className={'item-body'}
             data-done={status}
             data-garbage={isGarbage}
        >
            <span className={'item-count'}>{num}</span>
            <p className={'item-title'}>{title}</p>
            <div className={'button-wrapper'}>
                {
                    isGarbage
                        ? <button
                            className={'action-button renew-button'}
                            onClick={() => doneAction(num - 1)}
                        />
                        : <>
                            <button
                                className={'action-button done-button'}
                                onClick={() => doneAction(num - 1)}
                            />
                            <button
                                className={'action-button delete-button'}
                                onClick={() => deleteAction(num - 1)}
                            />
                        </>
                }
            </div>
        </div>
    )
};

export default ToDoItem