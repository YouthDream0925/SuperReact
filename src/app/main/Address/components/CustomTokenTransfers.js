import React from 'react';
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
import { element } from 'prop-types';
import {ethers} from "ethers";
import {useHistory} from "react-router-dom";

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

function createData(name, symbol, from, to, value) {
  return { name, symbol, from, to, value };
}

const columns = [
  { 
    id: 'name', 
    label: 'Name', 
    minWidth: 80,
    align: 'left',
  },
  { 
    id: 'symbol', 
    label: 'Symbol', 
    minWidth: 80,
    align: 'left',
  },
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
  }
];

const rows = [
  createData('0xcC748AC405c7C...', 'Transfer', '16777805	', '8 secs ago', '0x71638d..710289dF'),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const useStyles2 = makeStyles({
  table: {
    minWidth: '100%',
  },
});

export default function CustomTokenTransfers(props) {
  const history = useHistory();
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const tokentransfers = props.data;
  let rowsData = [];
  for(let i = 0; i < tokentransfers.length ; ++ i) {
    let method;
    method = "Transfer";
    rowsData.push(createData(
      tokentransfers[i].name,
      tokentransfers[i].symbol,
      tokentransfers[i].from,
      tokentransfers[i].to,
      tokentransfers[i].value
    ));
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClick = (targetAddress) => {
    history.push(`/address/${targetAddress}`);
    window.location.reload(false);
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
            ? rowsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rowsData
          ).map((row) => (
            <TableRow key={row.name}>
              <TableCell style={{ width: 80 }} align="left">
                <Button
                    component={Link}
                    className="block-selector"
                    variant="contained"
                    color="primary"
                    >
                    <span className="block-selector hidden sm:flex">{`${row.name}`}</span>
                </Button>
              </TableCell>
              <TableCell style={{ width: 100 }} align="left">
                {row.symbol}
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                <Button
                    className="block-selector"
                    variant="contained"
                    color="primary"
                    onClick={() => handleClick(row.from)}
                    >
                    <span className="block-selector hidden sm:flex">{`${row.from.slice(0, 5)}...${row.from.slice(row.from.length - 3, row.from.length)}`}</span>
                </Button>
              </TableCell>
              <TableCell style={{ width: 140 }} align="left">
                <Button
                    className="block-selector"
                    variant="contained"
                    color="primary"
                    onClick={() => handleClick(row.to)}
                    >
                    <span className="block-selector hidden sm:flex">{`${row.to.slice(0, 5)}...${row.to.slice(row.to.length - 3, row.to.length)}`}</span>
                </Button>
              </TableCell>
              <TableCell style={{ width: 140 }} align="left">
                {row.value / 1000000000000000000} ETH
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={8}
              count={rowsData.length}
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
