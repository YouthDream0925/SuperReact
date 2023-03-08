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
import './BlockDetail.css';

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

export default function BlockDetail(props) {
  console.log('1111111111111111111111111111', props.match.params.blockId);
  const classes = useStyles();

  return (
    <>
        <div className='page-header'>
            <strong>Block</strong> <span className='block-id'>#1673676</span>
        </div>
        <div className='page-body'>
            <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            Block Height
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            #1673676
                            <div style={{marginLeft: '1rem'}}>
                                <IconButton className="w-10 h-10"><Icon className='icon-font-size'>arrow_back_ios</Icon></IconButton>
                                <IconButton className="w-10 h-10"><Icon className='icon-font-size'>arrow_forward_ios</Icon></IconButton>
                            </div>
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            Status
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            <IconButton className="w-10 h-10"><Icon className='icon-font-size'>alarm_on</Icon></IconButton>
                            Undefined
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
                <Divider />
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            Fee Recipient:
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            Flashbots: Builder in 12 secs
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            Block Reward:
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            0.06175947201221 ETH (0 + 0.605442837492383 - 0.623638474021831)
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            Total Difficulty:
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            58,750,003,716,589,353,368
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            Size:
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            80698 bytes
                        </div>
                    </ListItem>
                </List>
                <Divider />
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            Gas Used:
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            12,655,231(42.18%) -16% Gas Target
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            Gas Limit: 
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            30,000,000
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            Base Fee Per Gas:
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            0.0000000485473729383 ETH (48.383737482 Gwei)
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            Burnt Fees:
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            0.623423423523234 ETH
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            Extra Data:
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            Illuminate Dmocratize Dstribute (Hex:0x496c6c756d696e61746520446d6f63726174697a6520447374726962757465)
                        </div>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            Hash:
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            0xcC748AC405c7C4212a304de55657240A034a7B88
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            Parent Hash:
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            0xcC748AC405c7C4212a304de55657240A034a7B88
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            StateRoot:
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            0xcC748AC405c7C4212a304de55657240A034a7B88
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className='item-box'>
                            <Icon className='mr-1'>help_outline</Icon>
                            Nonce:
                        </div>
                        <div className='space'></div>
                        <div className='item-box'>
                            0x00000000000000000000000
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