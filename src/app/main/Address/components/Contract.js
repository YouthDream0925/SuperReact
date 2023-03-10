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

export default function CustomPaginationActionsTable(props) {
    const code = props.code;
    const api = props.api;
    
    return (
        <>
            <React.Fragment>
                <CssBaseline />
                <Container fixed>
                    <div className='code-title'>CODE</div>
                    <textarea
                        style={{background: 'black', width: '100%'}}
                        className="w-100 h-100"
                        rows={20}
                        value={code}></textarea>
                </Container>
            </React.Fragment>
            <React.Fragment>
                <CssBaseline />
                <Container fixed>
                    <div className='code-title'>ABI</div>
                    <textarea
                        style={{background: 'black', width: '100%'}}
                        className="w-100 h-100"
                        rows={20}
                        value={api}></textarea>
                </Container>
            </React.Fragment>
        </>
    );
}