import { async } from 'q';
import * as React from 'react';
import {useState, useEffect, useMemo} from "react";
import api from "../../../utils/api.js";
import {ethers} from "ethers";
import Tracker from './components/Tracker';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      width: '100%',
      minWidth: 275
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
});

export default function GasTracker() {
    const classes = useStyles();
    const [data, setData] = useState([]);

    useEffect(async () => {
        const getGasPrice = (await api.get(`/getGasPrice`)).data.gasPrice;
        const temp = [
            {
                icon: '',
                level: 'Low',
                color: '#08a584',
                value: `${getGasPrice + 1}`,
                unit: 'wei',
                stringOne: 'Base: 27 | Priority: 1',
                stringTwo: '$0.89 | ~ 10 mins: 0 secs'
            },
            {
                icon: '',
                level: 'Low',
                value: '1',
                color: '#0974b3',
                unit: 'Gwei',
                stringOne: 'Base: 27 | Priority: 2',
                stringTwo: '$0.92 | ~ 3 mins: 0 secs'
            },
            {
                icon: '',
                level: 'Low',
                value: '2',
                color: '#8a2124',
                unit: 'Gwei',
                stringOne: 'Base: 27 | Priority: 3',
                stringTwo: '$0.96 | ~ 30 secs'
            }
        ];
        setData(temp);
    }, []);

    return (
        <>
            <div className='gas-tracker'>
                {
                    data.map((element) => (
                        <Tracker data = {element} />
                    ))
                }
            </div> 
        </>
    );
}