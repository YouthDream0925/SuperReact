import { memo, useState, useEffect, useMemo } from 'react';
import './Blocks.css';
import Element from '../Explorer/components/Element';
import CustomPaginationActionsTable from './components/CustomPaginationActionsTable';
import api from "../../../utils/api.js";
import {ethers} from "ethers";

export default function Blocks() {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(0);

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
                value: lastSafeBlock.data.lastSafeBlock,
                link: `/blocks/${lastSafeBlock.data.lastSafeBlock}`
            },
            {
                icon: '',
                key: 'AVERAGE GAS PRICE(For 100 blocks)',
                value: `${averageGasPrice.data.averagteGasPrice} wei`,
                link: "/gasTracker"
            },
            {
                icon: '',
                key: 'TRNSACTION COUNT(For 100 Blocks)',
                value: transactions.data.count,
                link: "/transactions"
            },
            {
                icon: '',
                key: 'REWARDS(For 100 blocks)',
                value: `${rewards.data.rewards / 1000000000} gwei`,
                link: "/blocks"
            }
        );
        setData(tmp);
        setIsLoaded(1);
    },[])  

    return useMemo(
        () => (
            <>
            {
                isLoaded == 1 ?
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
                :
                <></>
            }
            </>
        ),
        [data, isLoaded]
    );
}