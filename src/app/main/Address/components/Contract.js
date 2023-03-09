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
                    <Typography component="div" className="code-border" style={{ backgroundColor: '#1e2125', height: '100%', padding: '3rem' }}>
                        <div className='code-title'>CODE</div>
                        {code}
                    </Typography>
                </Container>
            </React.Fragment>
            <React.Fragment>
                <CssBaseline />
                <Container fixed>
                    <Typography component="div" style={{ backgroundColor: '#1e2125', height: '100%', padding: '3rem' }}>
                        <div className='code-title'>ABI</div>
                        {api}
                    </Typography>
                </Container>
            </React.Fragment>
        </>
    );
}