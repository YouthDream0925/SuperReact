import React from 'react';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import CustomPaginationActionsTable from './components/CustomPaginationActionsTable';
import Contract from './components/Contract';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import { useEffect, useState, useMemo } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import api from "../../../utils/api.js";
import {ethers} from "ethers";
import './Address.css';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    placeholder: "123-45-678",
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

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

const useStyles1 = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

function needsToBeOpened() {
  return true;
}

export default function Address(props) {
  const hash = props.match.params.hash;
  const classes = useStyles();
  const classes1 = useStyles1();
  const [address, setAddress] = useState({
    txs: [],
    tokenholdes: []
  });
  const bull = <span className={classes.bullet}>•</span>;

  // const [show_transactions, show_contracts] = useState(() => needsToBeOpened());

  const [addressTab, setAddressTab] = useState(true);
  const [age, setAge] = React.useState('');

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  function showTransactions(ev) {
    setAddressTab(true);
  }

  function showContracts(ev) {
    setAddressTab(false);
  }

  const handleChange = (event) => {
    props.history.push(`/address/${event.target.value}`)
    setAge(event.target.value);
  };

  useEffect(async () => {
    const temp = await api.get(`/getAddress/${hash}`);
    console.log(temp);
    setAddress(temp.data);
	}, [age]);  

  return useMemo(
    () => (
      <>
        <div className="address-header">
            <IconButton className="w-40 h-40"><Icon>search</Icon></IconButton>
            <div className="address-container">
                {address.type == 'address' ? 'Address' : 'Contract' } <span className='address-has'>{hash}</span>
                <div style={{marginLeft: '1rem'}}>
                    <IconButton className="w-40 h-40"><Icon>copy</Icon></IconButton>
                    <IconButton className="w-40 h-40"><Icon>border_all</Icon></IconButton>
                </div>
            </div>
        </div>
        <div className="address-info">
          <Card className={classes.root} style={{ marginRight: '1rem' }} variant="outlined">
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Overview
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                ETH BALANCE
              </Typography>
              <Typography className="address-container" variant="body2" component="p">
                <Icon className='icon-size'>copy</Icon> {`${address.ethBalance}`} ETH
              </Typography>
              <Typography style={{marginTop: '1rem'}}className={classes.title} color="textSecondary" gutterBottom>
                NONCE
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {address.nonce}
              </Typography>
              {
                address.type == 'address' ? 
                <FormControl className={classes.margin}>
                  <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    onChange={handleChange}
                    style={{ width: '250px' }}
                    input={<BootstrapInput />}
                  >
                    {
                      (address.tokenholdes).map((element) => (
                        <MenuItem value={`${element.address}`}>{`${element.name}(${element.symbol})`}</MenuItem>
                      ))
                    }              
                  </Select>                
                </FormControl>
                :
                <></>
              }              
            </CardContent>
          </Card>
          {
            address.type == 'contract' ? 
              <Card className={classes.root} style={{ marginLeft: '1rem' }} variant="outlined">
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    CONTRACT CREATOR
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {address.creator}
                  </Typography>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    TOKEN TRACKER
                  </Typography>
                  <Typography className="address-container" variant="body2" component="p">
                    <Icon className='icon-size'>copy</Icon> GCE (GCE)
                  </Typography>
                </CardContent>
              </Card>
            :
            <div></div>
          }          
        </div>
        <div className="address-body">
          <div className={classes1.root}>
            <Chip
              size="small"
              label="Transactions"
              color="primary"
              clickable
              onClick={showTransactions}
            />
            {
              address.type == 'contract' ?
              <Chip
                size="small"
                label="Contract"
                color="primary"
                clickable
                onClick={showContracts}
              />
              :
              <></>
            }
            
          </div>
          {
            addressTab ? 
            <div className="transactions">
              <CustomPaginationActionsTable txns={address.txs}/>
            </div>
            :
            <div className="contracts">
              <Contract code={address.code} api={address.ABI}/>
            </div>
          }
        </div>
      </>
    ),
    [addressTab, address]
  );
}