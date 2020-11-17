import React, { useCallback, useState } from 'react';
import './Input.scss'

interface IInput {
    onFinish: (text: string) => void;
}

const Input: React.FC<IInput> = ({onFinish}) => {

    const [value, setValue] = useState<string>('')

    const onEnter = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (value) {
                onFinish(value);
                setValue('');
            }
        }
    }, [onFinish, value]);

    return (
        <div className={'input-wrapper'}>
            <p className={'input-title'}>Enter task</p>
            <input
                className={'input-field'}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onEnter}
                value={value}
            />
        </div>
    )
}

export default Input;