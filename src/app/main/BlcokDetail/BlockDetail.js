import { memo, useState, useEffect, useMemo } from 'react';
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
import api from "../../../utils/api.js";
import './BlockDetail.css';
import {useHistory} from 'react-router-dom';

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
    let history = useHistory();

    const blockId = props.match.params.blockId;
    const classes = useStyles();
    const [block, setBlock] = useState({});
    const [used, setUsed] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [slot, setSlot] = useState(0);
    const [epoch, setEpoch] = useState(0);
    const [currentBlock, setCurrentBlock] = useState(-1);

    useEffect(async () => {
        const temp = await api.get(`/getBlock/${blockId}`);
        temp.data.extraData = temp.data.extraData.slice(0, 100) + '...';
        setBlock(temp.data);
        setUsed(temp.data.gasUsed.used);
        setPercentage(temp.data.gasUsed.percentage);
        setSlot(temp.data.proposedOn.slot);
        setEpoch(temp.data.proposedOn.epoch);
    },[])

    useEffect(async () => {
        if(currentBlock != -1) {
            const temp = await api.get(`/getBlock/${currentBlock}`);
            temp.data.extraData = temp.data.extraData.slice(0, 100) + '...';
            setBlock(temp.data);
            setUsed(temp.data.gasUsed.used);
            setPercentage(temp.data.gasUsed.percentage);
            setSlot(temp.data.proposedOn.slot);
            setEpoch(temp.data.proposedOn.epoch);
        }
    }, [currentBlock])

    const leftArrowClick = async () => {
        if(block.blockHeight > 0) {
            history.push(`/blocks/${block.blockHeight-1}`);
            setCurrentBlock(block.blockHeight-1);
        }
    }

    const rightArrowClick = async () => {
        const lastConfirmedBlock = (await api.get("/getLastConfirmedBlockNumber")).data.responseData;
        console.log(lastConfirmedBlock);
        if(block.blockHeight < lastConfirmedBlock) {
            history.push(`/blocks/${block.blockHeight+1}`);
            setCurrentBlock(block.blockHeight+1);
        }
    }

    return useMemo(
        () => (
            <>
            <div className='page-header'>
                <strong>Block</strong> <span className='block-id' style={{marginLeft: '1rem'}}>{block.blockHeight}</span>
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
                                #{block.blockHeight}
                                <div style={{marginLeft: '1rem'}}>
                                    <IconButton className="w-10 h-10" onClick={() => leftArrowClick()}><Icon className='icon-font-size'>arrow_back_ios</Icon></IconButton>
                                    <IconButton className="w-10 h-10" onClick={() => rightArrowClick()}><Icon className='icon-font-size'>arrow_forward_ios</Icon></IconButton>
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
                                {block.status == 0 ? "Unfinalized" : "Safe"}
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
                                {block.timestamp}
                            </div>
                        </ListItem>
                        <ListItem>
                            <div className='item-box'>
                                <Icon className='mr-1'>help_outline</Icon>
                                Proposed On:
                            </div>
                            <div className='space'></div>
                            <div className='item-box'>
                                {slot} - {epoch}
                            </div>
                        </ListItem>
                    </List>
                    <Divider />
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItem>
                            <div className='item-box'>
                                <Icon className='mr-1'>help_outline</Icon>
                                Block Reward:
                            </div>
                            <div className='space'></div>
                            <div className='item-box'>
                                {block.blockReward}
                            </div>
                        </ListItem>
                        <ListItem>
                            <div className='item-box'>
                                <Icon className='mr-1'>help_outline</Icon>
                                Total Difficulty:
                            </div>
                            <div className='space'></div>
                            <div className='item-box'>
                                {parseInt(block.totalDifficulty)}
                            </div>
                        </ListItem>
                        <ListItem>
                            <div className='item-box'>
                                <Icon className='mr-1'>help_outline</Icon>
                                Size:
                            </div>
                            <div className='space'></div>
                            <div className='item-box'>
                                {block.size} bytes
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
                                {used} - {percentage}
                            </div>
                        </ListItem>
                        <ListItem>
                            <div className='item-box'>
                                <Icon className='mr-1'>help_outline</Icon>
                                Gas Limit: 
                            </div>
                            <div className='space'></div>
                            <div className='item-box'>
                                {Number(block.gasLimit).toLocaleString()}
                            </div>
                        </ListItem>
                        <ListItem>
                            <div className='item-box'>
                                <Icon className='mr-1'>help_outline</Icon>
                                Base Fee Per Gas:
                            </div>
                            <div className='space'></div>
                            <div className='item-box'>
                                {block.baseFeePerGas} wei
                            </div>
                        </ListItem>
                        <ListItem>
                            <div className='item-box'>
                                <Icon className='mr-1'>help_outline</Icon>
                                Burnt Fees:
                            </div>
                            <div className='space'></div>
                            <div className='item-box'>
                                {block.burntFee / 1000000000} gwei
                            </div>
                        </ListItem>
                        <ListItem>
                            <div className='item-box'>
                                <Icon className='mr-1'>help_outline</Icon>
                                Extra Data:
                            </div>
                            <div className='space'></div>
                            <div className='item-box'>
                                {block.extraData}
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
                                {block.hash}
                            </div>
                        </ListItem>
                        <ListItem>
                            <div className='item-box'>
                                <Icon className='mr-1'>help_outline</Icon>
                                Parent Hash:
                            </div>
                            <div className='space'></div>
                            <div className='item-box'>
                                {block.parentHash}
                            </div>
                        </ListItem>
                        <ListItem>
                            <div className='item-box'>
                                <Icon className='mr-1'>help_outline</Icon>
                                StateRoot:
                            </div>
                            <div className='space'></div>
                            <div className='item-box'>
                                {block.stateRoot}
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
        ),[block, used, percentage, slot, epoch]
    );
}