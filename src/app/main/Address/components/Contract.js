import React from 'react';
import Button from '@material-ui/core/Button';
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
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default function CustomPaginationActionsTable() {
    const code = "<p>pragma solidity ^0.8.1;</p>" +    
                    "contract SendMoneyExample {" + 
                        "uint public balanceReceived;" +                         
                        "function receiveMoney() public payable {" + 
                            "balanceReceived += msg.value;" + 
                        "}" +                     
                        "function getBalance() public view returns(uint) {" + 
                            "return address(this).balance;" + 
                        "}" + 
                        "function withdrawMoney() public {" + 
                            "address payable to = payable(msg.sender);" + 
                            "to.transfer(getBalance());"  +
                        "}" + 
                    "}";
    return (
        <>
            <React.Fragment>
                <CssBaseline />
                <Container fixed>
                    <Typography component="div" style={{ backgroundColor: '#1e2125', height: '100%', padding: '3rem' }}>
                        <div>{"pragma solidity ^0.8.1;"}</div>
                        <div>{"contract SendMoneyExample {"}</div>
                        <div>{"uint public balanceReceived;"}</div>
                        <div>{"function receiveMoney() public payable {"}</div>
                        <div>{"balanceReceived += msg.value;"}</div>
                        <div>{"}"}</div>
                        <div>{"function getBalance() public view returns(uint) {"}</div>
                        <div>{"return address(this).balance;"}</div>
                        <div>{"}"}</div>
                        <div>{"function withdrawMoney() public {"}</div>
                        <div>{"address payable to = payable(msg.sender);"}</div>
                        <div>{"to.transfer(getBalance());"}</div>
                        <div>{"}"}</div>
                    </Typography>
                </Container>
            </React.Fragment>
        </>
    );
}