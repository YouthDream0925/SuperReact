import React, { useState, useEffect, useMemo } from 'react';
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

function createData(block, age, txn, gas, limit, base, reward, burnt, gasUsed) {
  return { block, age, txn, gas, limit, base, reward, burnt , gasUsed};
}

const columns = [
  { 
    id: 'block', 
    label: 'Block', 
    minWidth: 80,
    align: 'left',
  },
  { 
    id: 'age', 
    label: 'Age', 
    minWidth: 80,
    align: 'left',
  },
  {
    id: 'txn',
    label: 'Txn',
    minWidth: 40,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'gas',
    label: 'Gas Used',
    minWidth: 160,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'limit',
    label: 'Gas Limit',
    minWidth: 160,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'base',
    label: 'Base Fee',
    minWidth: 100,
    align: 'left',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'reward',
    label: 'Reward',
    minWidth: 100,
    align: 'left',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'burnt',
    label: 'Burnt Fees (ETH)',
    minWidth: 160,
    align: 'left',
    format: (value) => value.toFixed(2),
  },
];

const rows = [  
  createData('1663657', '17 secs ago', '106', '212,568,614 (41.90% | -16%)', '30,000,000', '60.63 Gwei', '0.09918 ETH', '0.762141 (-66.93%)'),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const useStyles2 = makeStyles({
  table: {
    minWidth: '100%',
  },
});

export default function CustomPaginationActionsTable(props) {
  const classes = useStyles2();
  const [totalBlocks, setTotalBlocks] = useState(0);
  const [blocks, setBlocks] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(async () => {
    const lastConfirmedBlockNumber = await api.get(`/getLastConfirmedBlockNumber`);
    let block_count = lastConfirmedBlockNumber.data.responseData;
    if(block_count != 0) {
      let temp = [];
      block_count = (block_count - (page * rowsPerPage)) > 0 ? (block_count - (page * rowsPerPage)) : 0;
      const lastBlock = await api.get(`/getBlock/${block_count}`);
      const lastBlockId = lastBlock.data.blockHeight;
      const startBlockId = (lastBlock.data.blockHeight - rowsPerPage + 1) >= 0 ? (lastBlock.data.blockHeight - rowsPerPage + 1) : 0;
      const blocks = await api.get(`/getAllBlocksStartToEnd?start=${startBlockId}&end=${lastBlockId}`);
      const legnth = rowsPerPage > blocks.data.length ? blocks.data.length : rowsPerPage;
      for(let i=0; i<legnth; i++) {
        temp.push(
          createData(`${blocks.data[i].number}`, `${blocks.data[i].timestamp}`, `${blocks.data[i].transactions.length}`, `${blocks.data[i].gasUsed / blocks.data[i].gasLimit * 100}`, `${blocks.data[i].gasLimit}`, `${blocks.data[i].baseFeePerGas}`, `${blocks.data[i].blockReward}`, `${blocks.data[i].burntFee}`, blocks.data[i].gasUsed),
        );
      }
      setBlocks(temp);
      setTotalBlocks(lastConfirmedBlockNumber.data.responseData + 1);
    }
  },[props, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setBlocks([]);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setBlocks([]);
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

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  const formatDate = (unix_timestamp) => {
    var date = new Date(unix_timestamp * 1000);
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }

  return useMemo( () => (
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
          <TableBody>
            {(blocks).map((row) => (
              <TableRow key={row.block}>
                <TableCell style={{ width: 80 }} align="left">
                  <Button
                      component={Link}
                      to={`/blocks/${row.block}`}
                      className="block-selector"
                      variant="contained"
                      color="primary"
                      >
                      <span className="block-selector hidden sm:flex">{row.block}</span>
                  </Button>
                </TableCell>
                <TableCell style={{ width: 100 }} align="left">
                  {`${Math.floor(new Date().getTime() / 1000) - row.age} secs ago`}
                </TableCell>
                <TableCell style={{ width: 40 }} align="left">
                  <span className="highlight-color">{row.txn}</span>                
                </TableCell>
                <TableCell style={{ width: 180 }} align="left">
                  {parseFloat(row.gas).toFixed(4)}%
                  <Slider
                    className="highlight-color"
                    ValueLabelComponent={ValueLabelComponent}
                    aria-label="custom thumb label"
                    defaultValue={parseInt(row.gas)}
                    disabled={true}
                  />
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  {row.limit}
                </TableCell>
                <TableCell style={{ width: 140 }} align="left">
                  {`${row.base} wei`}
                </TableCell>
                <TableCell style={{ width: 140 }} align="left">
                  {`${row.reward / 1000000000} Gwei`}
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  {`${row.base * row.gasUsed} wei`}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={8}
                count={totalBlocks}
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
  ),[blocks, totalBlocks]);
}
