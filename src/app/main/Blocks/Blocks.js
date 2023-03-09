import { memo, useState, useEffect, useMemo } from 'react';
import './Blocks.css';
import Element from '../Explorer/components/Element';
import CustomPaginationActionsTable from './components/CustomPaginationActionsTable';
import api from "../../../utils/api.js";
import {ethers} from "ethers";

export default function Blocks() {
    const [data, setData] = useState([]);
    const [lastConfirmedBlockNumber, setLastBlock] = useState(0);

    useEffect(async () => {
        const lastSafeBlock = await api.get(`/getLastSafeBlockNumber`);
        const averageGasPrice = await api.get(`/getAverageGasPrice`);
        const transactions = await api.get(`/getTransactionCountForBlocks`);
        const rewards = await api.get(`/getBlockRewards`);

        var tmp = [];
        tmp.push(
            {
                icon: '',
                key: 'LAST SAFE BLOCK',
                value: lastSafeBlock.data.lastSafeBlock
            },
            {
                icon: '',
                key: 'AVERAGE GAS PRICE',
                value: averageGasPrice.data.averagteGasPrice
            },
            {
                icon: '',
                key: 'TRNSACTION COUNT',
                value: transactions.data.count
            },
            {
                icon: '',
                key: 'REWARDS',
                value: rewards.data.rewards
            }
        );
        setData(tmp);        
    },[])  

    return useMemo(
        () => (
            <>
                <div className='blocks-header'>
                    {
                        data.map((element) => (
                            <Element data = {element} />
                        ))
                    }
                </div>
                <div className="blocks-body">
                    <CustomPaginationActionsTable data={data}/>
                </div>            
            </>
        ),
        [data]
    );
}