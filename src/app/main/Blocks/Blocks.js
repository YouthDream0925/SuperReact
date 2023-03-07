import * as React from 'react';
import './Blocks.css';
import Element from '../Explorer/components/Element';
import CustomPaginationActionsTable from './components/CustomPaginationActionsTable';

export default function Blocks() {
    const data = [
        {
            icon: '',
            key: 'LAST SAFE BLOCK',
            value: '16763608'
        },
        {
            icon: '',
            key: 'AVERAGE GAS PRICE (24H)',
            value: '27.052351676 Gwei'
        },
    ]
    return (
        <>
            <div className='blocks-header'>
                {
                    data.map((element) => (
                        <Element data = {element} />
                    ))
                }
            </div>
            <div className="blocks-body">
                <CustomPaginationActionsTable />
            </div>            
        </>
    );
}