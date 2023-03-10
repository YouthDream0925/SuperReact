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
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading.js';

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
    id: 'name', 
    label: 'Name', 
    minWidth: 100,
    align: 'left',
  },
  { 
    id: 'type', 
    label: 'Type', 
    minWidth: 100,
    align: 'left',
  },
  {
    id: 'value',
    label: 'Value',
    minWidth: 100,
    align: 'left',
  }
];

const useStyles2 = makeStyles({
  table: {
    minWidth: '100%',
  },
});

function createData(name, type, value) {
  return { name, type, value };
}

export default function CustomParams(props) {
  const classes = useStyles2();
  const [params, setParams] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(async () => {
    const total_params = props.params;
    if(total_params.length != 0) {
      let rowsData = [];
      for(let i = 0; i < total_params.length ; ++ i) {
        rowsData.push(createData(
          total_params[i].name,
          total_params[i].type,
          total_params[i].value
        ));
      }
      setParams(rowsData);
    }
  }, []);

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
    
      <TableContainer component={Paper} style={{ borderRadius: '0', background: 'black', width: '100%'}}>
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
            {(params).map((row) => (
              <TableRow key={row.name}>
                <TableCell style={{ width: 80 }} align="left">
                  <Button
                      component={Link}
                      className="block-selector"
                      variant="contained"
                      color="primary"
                      >
                      <span className="block-selector hidden sm:flex">{row.name}</span>
                  </Button>
                </TableCell>
                <TableCell style={{ width: 100 }} align="left">
                  {row.type}
                </TableCell>
                <TableCell style={{ width: 140 }} align="left">
                  {row.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={8}
                count={params.length}
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
  ),[params]);
}
