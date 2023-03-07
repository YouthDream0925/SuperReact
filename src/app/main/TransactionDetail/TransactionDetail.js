import React from 'react';
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

export default function TransactionDetail() {
  const classes = useStyles();

  return (
    <>
        <div className='page-header d-flex'>
            <strong>Transaction Details</strong>
            <div style={{marginLeft: '1rem'}}>
                <IconButton className="w-10 h-10"><Icon className='icon-font-size'>arrow_back_ios</Icon></IconButton>
                <IconButton className="w-10 h-10"><Icon className='icon-font-size'>arrow_forward_ios</Icon></IconButton>
            </div>
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
                            0xcC748AC405c7C4212a304de55657240A034a7B88
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
                            16763676
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
                            5 mins ago (Mar-05-2023 05:27:47 PM +UTC)
                        </div>
                    </ListItem>
                </List>
                <Divider />
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            Sponsored:
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            
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
                            0xcC748AC405c7C4212a304de55657240A034a7B88
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            To:
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            0xcC748AC405c7C4212a304de55657240A034a7B88
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
                            0.0238437572392342343 ETH ($95.39)
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            Transaction Fee:
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            0.0018238347393 ETH ($1.63)
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            Gas Price: 
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            49.2342114231234 Gwei (0.0039348373838484 ETH)
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
                            21,000 | 21,000 (100%)
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            Gas Fees:
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            Base: 49.12314221423 Gwei | Max: 49.1231434234 Gwei | Max Priority: 0 ETH
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            Burnt & Txn Savings Fees:
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            Burnt: 0.002342348834354234 ETH ($1.63), Txn Savings: 0 ETH ($0.00)
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
                            Txn Type: 2 (BP-1559), Nonce: 255429, Position in Block: 117
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            Input Data:
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            9x
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