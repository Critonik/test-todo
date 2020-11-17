import './Filter.scss';
import React, { useState } from 'react';

interface IFilter {
    callBack: (type: string) => void;
}

enum EFilterState {
    OFFLINE = 'OFFLINE',
    ASC = 'ASC',
    DESC = 'DESC'
}

const Filter: React.FC<IFilter> = ({callBack}) => {

    const [filterState, setFilterState] = useState<EFilterState>(EFilterState.OFFLINE);

    const onClick = () => {
        switch (filterState) {
            case EFilterState.ASC:
                setFilterState(EFilterState.DESC);
                callBack(EFilterState.DESC);
                break;
            case EFilterState.DESC:
                setFilterState(EFilterState.OFFLINE);
                callBack(EFilterState.OFFLINE);
                break;
            case EFilterState.OFFLINE:
                setFilterState(EFilterState.ASC);
                callBack(EFilterState.ASC);
                break;
        }
    }

    return (
        <div className={'filter-wrapper'}>
            <button
                className={'filter-button'}
                data-state={filterState}
                onClick={onClick}
            >
                Filter {filterState}
            </button>
        </div>
    );
}

export default Filter;