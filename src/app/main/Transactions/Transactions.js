import * as React from 'react';
import CustomPaginationActionsTable from './components/CustomPaginationActionsTable';

export default function Transactions() {
    return (
        <>
            <div className='page-header'>
                <div>
                    <strong>Transactions</strong>
                </div>
                <div>
                    <span className='block-id'>For All Blocks</span>
                </div>                 
            </div>
            <div className='page-body'>
                <CustomPaginationActionsTable />
            </div>
        </>
    );
}