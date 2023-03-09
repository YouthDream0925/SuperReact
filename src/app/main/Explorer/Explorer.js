import * as React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Input from '@material-ui/core/Input';
import { ThemeProvider, useTheme } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Element from './components/Element';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import CustomizedTablesForBlocks from './components/CustomizedTablesForBlocks';
import CustomizedTablesForTransactions from './components/CustomizedTablesForTransactions';
// import Link from '@material-ui/core/Link';
import { Link } from 'react-router-dom';
import './Explorer.css';
import api from "../../../utils/api.js";
import {useHistory} from 'react-router-dom';

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
  
const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));
  
export default function Explorer() {
    let history = useHistory();

    const [data, setData] = React.useState([
        {
            icon: 'receipt_long',
            key: 'TRANSACTIONS',
            value: 0,
            link: "transactions"
        },
        {
            icon: '',
            key: 'MED GAS PRICE',
            value: '0 Gwei',
            link: "gasTracker"
        },
        {
            icon: '',
            key: 'LAST SAFE BLOCK',
            value: '0',
            link: "blocks"
        }
    ]);

    const theme = useTheme();
    const classes = useStyles();
    const [searchMethod, setSearchMethod] = React.useState(0);
    const [searchInput, setSearchInput] = React.useState('');

    React.useEffect(async () => {
        const gasPrices = (await api.get("/getLatestGasPrices")).data;
        const getLastSafeBlock = (await api.get("/getLastSafeBlockNumber")).data.lastSafeBlock;
        let gasAverage = 0;
        for(let i = 0 ; i < gasPrices.length ; ++i) {
            gasAverage += parseInt(gasPrices[i]);
        }
        gasAverage = Math.floor(gasAverage / gasPrices.length);
        setData([
            {
                icon: 'receipt_long',
                key: 'TRANSACTIONS',
                value: (await api.get("/getTransactionCount")).data.responseData,
                link: "transactions"
            },
            {
                icon: '',
                key: 'MED GAS PRICE',
                value: `${gasAverage} wei`,
                link: "gasTracker"
            },
            {
                icon: '',
                key: 'LAST SAFE BLOCK',
                value: getLastSafeBlock,
                link: "blocks"
            }
        ]);
    }, [])
    const handleChange = (event) => {
        setSearchMethod(event.target.value);
    };

    const handleInputChange = (e) => {
        if(e.key === 'Enter' || e.keyCode === 13) {
            console.log(searchInput, searchMethod);
            if(searchMethod == 0){
                if(searchInput.length == 42) {
                    history.push(`/address/${searchInput}`);
                } else if(searchInput.length == 66) {
                    history.push(`/transactions/${searchInput}`);
                } else {
                    history.push(`/blocks/${searchInput}`);
                }
            } else if(searchMethod == 1) {
                history.push(`/address/${searchInput}`);
            } else if(searchMethod == 2) {
                history.push(`/transactions/${searchInput}`);
            } else if(searchMethod == 3) {
                history.push(`/blocks/${searchInput}`);
            }
        } else setSearchInput(e.target.value);
    }

    return (
        <>
            <div className='search'>
                <FormControl className={classes.margin}>
                    <Select
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        value={searchMethod}
                        onChange={handleChange}
                        style={{ width: '120px' }}
                        input={<BootstrapInput />}
                    >
                        <MenuItem value={0}>All Filters</MenuItem>
                        <MenuItem value={1}>Addresses</MenuItem>
                        <MenuItem value={2}>Transaction Hashes</MenuItem>
                        <MenuItem value={3}>Block Number</MenuItem>
                    </Select>
                </FormControl>
                <div className="flex flex-1 items-center max-w-md">
                    <ThemeProvider theme={theme}>
                        <Paper className="flex items-center h-44 w-full px-16 rounded-16 shadow">
                            <Input
                                placeholder="Search by Address / Txn Hash / Block"
                                disableUnderline
                                fullWidth
                                inputProps={{
                                'aria-label': 'Search',
                                }}
                                onKeyUp = {(e) => handleInputChange(e)}
                            />
                            <Icon color="action">search</Icon>
                        </Paper>
                    </ThemeProvider>
                </div>
                {
                    data.map((element) => (
                        <Element data = {element} />
                    ))
                }
            </div>
            <div className="table-container">
                <div style={{ width: '50%', marginRight: '0.75rem' }}>
                    <div className='table-header'>LAST BLOCKS</div>
                    <CustomizedTablesForBlocks />
                    <div className='table-footer'>
                        <Button
                            component={Link}
                            to="/blocks"
                            className="whitespace-nowrap"
                            variant="contained"
                            color="primary"
                            >
                            <span className="hidden sm:flex">VIEW ALL BLOCKS</span>
                        </Button>
                    </div>
                </div>
                <div style={{ width: '50%', marginLeft: '0.75rem' }}>
                    <div className='table-header'>LAST TRANSACTIONS</div>
                    <CustomizedTablesForTransactions />
                    <div className='table-footer'>
                        <Button
                            component={Link}
                            to="/transactions"
                            className="whitespace-nowrap"
                            variant="contained"
                            color="primary"
                            >
                            <span className="hidden sm:flex">VIEW ALL TRANSACIONS</span>
                        </Button>
                    </div>                    
                </div>
            </div>
        </>
    );
}