import React from 'react';
import {useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import './TransactionDetail.css';
import api from "../../../utils/api.js";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function TransactionDetail(props) {
    const classes = useStyles();
    const txhash = props.match.params.transactionId;
    const [txDetail, setTxDetail] = useState({
        gasLimitAndUsage: {},
        gasFees: {},
        otherType: {},
        burntFeeAndSavingFee: {},
    });

    useEffect(async () => {
        const tx = (await api.get(`/getTransaction/${txhash}`)).data;
        setTxDetail(tx);
        console.log(tx);
    }, [])

  return (
    <>
        <div className='page-header d-flex'>
            <strong>Transaction Details</strong>
            {/* <div style={{marginLeft: '1rem'}}>
                <IconButton className="w-10 h-10"><Icon className='icon-font-size'>arrow_back_ios</Icon></IconButton>
                <IconButton className="w-10 h-10"><Icon className='icon-font-size'>arrow_forward_ios</Icon></IconButton>
            </div> */}
        </div>
        <div className='page-body'>
            <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            Transaction Hash:
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            {txhash}
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            Status:
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            <IconButton className="w-10 h-10"><Icon className='icon-font-size'>alarm_on</Icon></IconButton>
                            Success
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            Block:
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            <IconButton className="w-10 h-10"><Icon className='icon-font-size'>schedule</Icon></IconButton>
                            {txDetail.block}
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            Timestamp:
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            <IconButton className="w-10 h-10"><Icon className='icon-font-size'>schedule</Icon></IconButton>
                            {txDetail.timestamp}
                        </div>
                    </ListItem>
                </List>
                <Divider />
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            From:
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            {txDetail.from}
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            To:
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            {txDetail.to}
                        </div>
                    </ListItem>
                </List>
                <Divider />
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            Value:
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            {txDetail.value} wei
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            Transaction Fee:
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            {txDetail.transactionFee} wei
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            Gas Price: 
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            {txDetail.gasPrice} wei
                        </div>
                    </ListItem>
                </List>
                <Divider />
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            Gas Limit & Usage by Txn:
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            {txDetail.gasLimitAndUsage.gasLimit} | {txDetail.gasLimitAndUsage.gasUsed} ({txDetail.gasLimitAndUsage.gasUsed / txDetail.gasLimitAndUsage.gasLimit * 100}%)
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            Gas Fees:
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            Base: {txDetail.gasFees.base} wei | Max: {txDetail.gasFees.Max} gwei | Max Priority: {txDetail.gasFees.MaxPriority} wei
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            Burnt & Txn Savings Fees:
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            Burnt: {txDetail.burntFeeAndSavingFee.burnt} wei, Txn Savings: {txDetail.burntFeeAndSavingFee.saving} wei
                        </div>
                    </ListItem>
                </List>
                <Divider />
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            Other Attributes:
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            Txn Type: {txDetail.otherType.txnType} (BP-1559), Nonce: {txDetail.otherType.nonce}, Position in Block: {txDetail.otherType.position}
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            Input Data:
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            {txDetail.inputData}
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className='item-box'>
                            More Details:
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            <Icon className='mr-1'>horizontal_rule</Icon>
                            Click to show less
                        </div>
                    </ListItem>
                </List>
            </div>
        </div>
    </>    
  );
}