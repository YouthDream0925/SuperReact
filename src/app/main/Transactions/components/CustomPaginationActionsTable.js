import React from 'react';
import {useState, useEffect} from "react";
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
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([]);

  useEffect(async () => {
    const responseData = (await api.get("/getAllTransactions")).data;
    let rowsData = []
    for(let i = 0; i < responseData.length ; ++ i) {
      let method;
      if(responseData[i].contractAddress != null)
      {
        method = "Contract Creation";
      } else if(responseData[i].input == "0x" || responseData[i].input == "") {
        method = "Transfer";
      } else {
        method = responseData[i].input.slice(0, 10);
      }
      rowsData.push(createData(
        responseData[i].hash,
        method,
        responseData[i].blockNumber,
        responseData[i].from,
        responseData[i].from,
        responseData[i].value,
        ethers.BigNumber.from(responseData[i].effectiveGasPrice).mul(responseData[i].gasUsed).toString()
      ));
    }
    setRows(rowsData);
  }, []);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
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

  return (
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
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
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
                <span className="highlight-color">{row.block}</span>
              </TableCell>
              {/* <TableCell style={{ width: 180 }} align="left">
                {row.age}
              </TableCell> */}
              <TableCell style={{ width: 160 }} align="left">
                <Button
                    component={Link}
                    to="/address"
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
                    to="/txn_detail"
                    className="block-selector"
                    variant="contained"
                    color="primary"
                    >
                    <span className="block-selector hidden sm:flex">{`${row.to.slice(0, 5)}...${row.to.slice(row.to.length - 3, row.to.length)}`}</span>
                </Button>
              </TableCell>
              <TableCell style={{ width: 140 }} align="left">
                {row.value} wei
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                {row.fee} wei
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={8} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={8}
              count={rows.length}
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
  );
}
