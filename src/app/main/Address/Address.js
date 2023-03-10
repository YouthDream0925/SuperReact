import React from 'react';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import CustomTokenTransfers from './components/CustomTokenTransfers';
import CustomPaginationActionsTable from './components/CustomPaginationActionsTable';
import Contract from './components/Contract';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import { useEffect, useState, useMemo } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import api from "../../../utils/api.js";
import {ethers} from "ethers";
import FuseLoading from '@fuse/core/FuseLoading';
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
  const [isLoaded, setIsLoaded] = useState(0);
  const [address, setAddress] = useState({
    txs: [],
    tokenholdes: []
  });
  const bull = <span className={classes.bullet}>•</span>;

  // const [show_transactions, show_contracts] = useState(() => needsToBeOpened());

  const [tockenTransfers, setTokenTransfers] = useState(false);
  const [addressTab, setAddressTab] = useState(true);
  const [age, setAge] = React.useState('');

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  function showTransactions(ev) {
    setTokenTransfers(false);
    setAddressTab(true);
  }

  function showContracts(ev) {
    setTokenTransfers(false);
    setAddressTab(false);
  }

  function showTockenTransfers(ev) {
    setTokenTransfers(true);
    setAddressTab(false);
  }
  
  const handleChange = (event) => {
    props.history.push(`/address/${event.target.value}`)
    setAge(event.target.value);
  };

  useEffect(async () => {
    const temp = await api.get(`/getAddress/${hash}`);
    console.log(temp);
    if(temp.data.message !== undefined) {
      setIsLoaded(2);
    } else {
      setAddress(temp.data);
      setIsLoaded(1);
    }
	}, [age]);  

  return useMemo(
    () => (
      <>
        {
          isLoaded == 1 ?
          <div className="address-header">
              <IconButton className="w-40 h-40"><Icon>search</Icon></IconButton>
              <div className="address-container">
                  {address.type == 'address' ? 'Address' : 'Contract' } <span className='address-has'>{hash}</span>
                  <div style={{marginLeft: '1rem'}}>
                      <IconButton className="w-40 h-40"><Icon>copy</Icon></IconButton>
                  </div>
              </div>
          </div>
          : isLoaded == 2 ?
          <div className="page-body" style={{marginTop: '5rem'}}>
            <Button className="item-box"
                component={Link}
                to={`/explorer`}
            >
                <strong>Invalid address!</strong>
            </Button>
          </div>
          :
          <FuseLoading/>
        }        
        <div className="address-info">
          {
            isLoaded == 1 ?
            <Card className={classes.root} style={{ marginRight: '1rem' }} variant="outlined">
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  <strong>Overview</strong>
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  <strong>ETH BALANCE</strong>
                </Typography>
                <Typography className="address-container" variant="body2" component="p">
                  {`${address.ethBalance / 1000000000000000000}`} ETH
                </Typography>
                <Typography style={{marginTop: '1rem'}}className={classes.title} color="textSecondary" gutterBottom>
                  <strong>NONCE</strong>
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {address.nonce}
                </Typography>
              </CardContent>
            </Card>
            : isLoaded == 2 ?
            <></>
            :
            <></>
          }          
          {
            address.type == 'contract' && isLoaded == 1 ? 
              <Card className={classes.root} style={{ marginLeft: '1rem' }} variant="outlined">
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    <strong>CONTRACT CREATOR</strong>
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {address.creator}
                  </Typography>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    <strong>TOKEN TRACKER</strong>
                  </Typography>
                  <Typography className="address-container" variant="body2" component="p">
                    {`${address.name} (${address.symbol})`}
                  </Typography>
                  <Typography style={{marginTop: '1rem'}} className={classes.title} color="textSecondary" gutterBottom>
                    <strong>DECIMALS</strong>
                  </Typography>
                  <Typography className="address-container" variant="body2" component="p">
                    {`${address.decimals}`}
                  </Typography>
                </CardContent>
              </Card>
            : isLoaded == 1 ?
              <Card className={classes.root} style={{ marginLeft: '1rem' }} variant="outlined">
                <CardContent>
                  <Typography className="address-container" variant="body2" component="p">
                    TOKEN HOLDINGS
                  </Typography>
                  <FormControl className={classes.margin}>
                    <Select
                      labelId="demo-customized-select-label"
                      id="demo-customized-select"
                      onChange={handleChange}
                      value={0}
                      style={{ width: '250px' }}
                      input={<BootstrapInput />}
                    >
                      <MenuItem value={0}>Please select token holders</MenuItem>
                      {
                        (address.tokenholdes).map((element) => (
                          <MenuItem value={`${element.address}`}>{`${element.name}(${element.symbol})`} - {`${element.value / Math.pow(10, element.decimals) } ${element.symbol}`}</MenuItem>
                        ))
                      }              
                    </Select>                
                  </FormControl>
                </CardContent>
              </Card>
            :
              <></>
          }          
        </div>
        <div className="address-body">
          {
            isLoaded == 1 ?
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
              <Chip
                size="small"
                label="Token Transfers"
                color="primary"
                clickable
                onClick={showTockenTransfers}
              />
            </div>
            :
            <></>
          }          
          {
            addressTab && isLoaded == 1? 
            <div className="transactions">
              <CustomPaginationActionsTable txns={address.txs}/>
            </div>
            : 
            tockenTransfers && isLoaded == 1?
            <></>
            : isLoaded == 1 ?
            <div className="contracts">
              <Contract code={address.code} api={address.ABI}/>
            </div>
            :
            <></>
          }
          {
            tockenTransfers && isLoaded == 1?
            <div className="transactions">
              <CustomTokenTransfers data={address.tokentransfers}/>
            </div> :
            <></>
          }
        </div>
      </>
    ),
    [addressTab, address, isLoaded, tockenTransfers]
  );
}