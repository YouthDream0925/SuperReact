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

export default function CustomPaginationActionsTable() {
    return (
        <>
            <div>
                <Button
                    component={Link}
                    to="/blocks"
                    className="whitespace-nowrap mr-1"
                    variant="contained"
                    color="primary"
                    >
                    <span className="hidden sm:flex">Code</span>
                </Button>
                <Button
                    component={Link}
                    to="/blocks"
                    className="whitespace-nowrap mr-1"
                    variant="contained"
                    color="primary"
                    >
                    <span className="hidden sm:flex">Read Contract</span>
                </Button>
                <Button
                    component={Link}
                    to="/blocks"
                    className="whitespace-nowrap mr-1"
                    variant="contained"
                    color="primary"
                    >
                    <span className="hidden sm:flex">Write Contract</span>
                </Button>
            </div>
            <div>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            Contract Source Code Verified (Exact Match)
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className='item-box'>
                            Contract Name:
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            TetherToken
                        </div>
                        <div className='item-box'>
                            Contract Name:
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            TetherToken
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
                            1 min ago (Mar-05-2023 05:27:47 PM +UTC)
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            Proposed On:
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            Block proposed on slot 5934437, cpoch 185451
                        </div>
                    </ListItem>
                </List>
            </div>
        </>
    );
}