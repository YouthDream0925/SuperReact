import React from 'react';
import {useState, useEffect, useMemo} from "react";
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { TableHead } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import api from "../../../../utils/api.js";
import {ethers} from "ethers";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


const columns = [
  { 
    id: 'hash', 
    label: 'Txn Hash', 
    minWidth: 80,
    align: 'left',
  },
  { 
    id: 'method', 
    label: 'Method', 
    minWidth: 80,
    align: 'left',
  },
  {
    id: 'block',
    label: 'Block',
    minWidth: 40,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  // {
  //   id: 'age',
  //   label: 'Age',
  //   minWidth: 160,
  //   align: 'left',
  //   format: (value) => value.toLocaleString('en-US'),
  // },
  {
    id: 'from',
    label: 'From',
    minWidth: 160,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'to',
    label: 'To',
    minWidth: 100,
    align: 'left',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'value',
    label: 'Value',
    minWidth: 100,
    align: 'left',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'fee',
    label: 'Txn Fee',
    minWidth: 160,
    align: 'left',
    format: (value) => value.toFixed(2),
  },
];

const useStyles2 = makeStyles({
  table: {
    minWidth: '100%',
  },
});

function createData(hash, method, block, from, to, value, fee) {
  return { hash, method, block, from, to, value, fee };
}

export default function CustomPaginationActionsTable() {
  const classes = useStyles2();
  const [totalTxns, setTotalTxns] = useState(0);
  const [txns, setTxns] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isLoaded, setIsLoaded] = useState(0);

  useEffect(async () => {
    const total_transactions = (await api.get(`/getTransactionCount`)).data.responseData;
    if(total_transactions != 0) {
      const last_txn_id = (total_transactions - (page * rowsPerPage) - 1) > 0 ? (total_transactions - (page * rowsPerPage) - 1) : 0;
      const start_txn_id = (last_txn_id - rowsPerPage + 1) > 0 ? (last_txn_id - rowsPerPage + 1) : 0;
      const txns = await api.get(`/getAllTransactionsStartToEnd?start=${start_txn_id}&end=${last_txn_id}`);
      const txns_length = rowsPerPage > txns.data.length ? txns.data.length : rowsPerPage;

      let rowsData = [];
      for(let i = 0; i < txns_length ; ++ i) {
        let method;
        if(txns.data[i].contractAddress != null)
        {
          method = "Contract Creation";
        } else if(txns.data[i].input == "0x" || txns.data[i].input == "") {
          method = "Transfer";
        } else {
          method = txns.data[i].input.slice(0, 10);
        }
        rowsData.push(createData(
          txns.data[i].hash,
          method,
          txns.data[i].blockNumber,
          txns.data[i].from,
          txns.data[i].to == null ? txns.data[i].contractAddress : txns.data[i].to,
          txns.data[i].value,
          ethers.BigNumber.from(txns.data[i].effectiveGasPrice).mul(txns.data[i].gasUsed).toString()
        ));
      }
      setTxns(rowsData);
      setTotalTxns(total_transactions);
      setIsLoaded(1);
    }
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setIsLoaded(0);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setIsLoaded(0);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function ValueLabelComponent(props) {
    const { children, open, value } = props;
  
    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }

  return useMemo(() => (
    <>
    
      <TableContainer component={Paper} style={{ borderRadius: '0'}}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {isLoaded == 1 ?
          <TableBody>
            {(txns).map((row) => (
              <TableRow key={row.hash}>
                <TableCell style={{ width: 80 }} align="left">
                  <Button
                      component={Link}
                      to={`/transactions/${row.hash}`}
                      className="block-selector"
                      variant="contained"
                      color="primary"
                      >
                      <span className="block-selector hidden sm:flex">{`${row.hash.slice(0, 5)}...${row.hash.slice(row.hash.length - 3, row.hash.length)}`}</span>
                  </Button>
                </TableCell>
                <TableCell style={{ width: 100 }} align="left">
                  {row.method}
                </TableCell>
                <TableCell style={{ width: 40 }} align="left">
                <Button
                  component={Link}
                  to={`/blocks/${row.block}`}
                  style={{justifyContent: 'start'}}
                  className="block-selector"
                  variant="contained"
                  color="primary"
                >
                  <span className="block-selector hidden sm:flex">{row.block}</span>
                </Button>
                </TableCell>
                {/* <TableCell style={{ width: 180 }} align="left">
                  {row.age}
                </TableCell> */}
                <TableCell style={{ width: 160 }} align="left">
                  <Button
                      component={Link}
                      to={`/address/${row.from}`}
                      className="block-selector"
                      variant="contained"
                      color="primary"
                      >
                      <span className="block-selector hidden sm:flex">{`${row.from.slice(0, 5)}...${row.from.slice(row.from.length - 3, row.from.length)}`}</span>
                  </Button>
                </TableCell>
                <TableCell style={{ width: 140 }} align="left">
                  <Button
                      component={Link}
                      to={`/address/${row.to}`}
                      className="block-selector"
                      variant="contained"
                      color="primary"
                      >
                      <span className="block-selector hidden sm:flex">{`${row.to.slice(0, 5)}...${row.to.slice(row.to.length - 3, row.to.length)}`}</span>
                  </Button>
                </TableCell>
                <TableCell style={{ width: 140 }} align="left">
                  {row.value / 1000000000000000000} ETH
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  {row.fee / 1000000000} Gwei
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          :<></>
          }
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={8}
                count={totalTxns}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  ),[txns, totalTxns, isLoaded]);
}
