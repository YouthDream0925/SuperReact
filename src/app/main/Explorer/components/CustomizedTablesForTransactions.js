import React from 'react';
import { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import api from "../../../../utils/api.js";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(hash, timeStamp, from, to, value) {
  return { hash, timeStamp, from, to, value };
}

const useStyles = makeStyles({
  table: {
    minWidth: '100%',
  },
});

export default function CustomizedTablesForTransactions(props) {
  const classes = useStyles();

  const [rows, setRows] = useState([]);

  useEffect(async () => {
    const blks = props.txns;
    let rowsTemp = [];
    for(let i = 0 ; i < blks.length; ++ i) {
      rowsTemp.push(createData(blks[i].txHash, Math.floor(new Date().getTime() / 1000) - blks[i].timestamp, blks[i].from, blks[i].to, blks[i].value));
    }
    console.log(rowsTemp);
    setRows(rowsTemp);
  }, [])

  return (
    <TableContainer component={Paper} style={{ borderRadius: '0'}}>
      <Table className={classes.table} aria-label="customized table">
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.block}>
              <StyledTableCell component="th" scope="row">
                <div style={{ display: 'flex', alignItems: 'center'}}>
                  <Icon>search</Icon>
                  <div style={{ marginLeft: '1rem' }}>
                    <Button style={{color: '#5395c9'}}
                        component={Link}
                        to={`/transactions/${row.hash}`}
                        className="block-selector"
                        variant="contained"
                        color="primary"
                    >
                      {row.hash.slice(0,15)}...
                    </Button> 
                    <p>{row.timeStamp}s ago</p> 
                  </div>
                </div>
              </StyledTableCell>
              <StyledTableCell align="left">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center'}}>
                    <p style={{ marginRight: '0.5rem'}}>From </p>
                    <Button
                        component={Link}
                        to={`/address/${row.from}`}
                        className="block-selector"
                        variant="contained"
                        color="primary"
                        >
                        <span className="block-selector hidden sm:flex">{`${row.from.slice(0, 5)}...${row.from.slice(row.from.length - 3, row.from)}`}</span>
                    </Button>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center'}}>
                    <p style={{marginRight: '0.5rem'}}>To</p>
                    <Button style={{color: '#5395c9', marginLeft: '0.5rem'}}
                      component={Link}
                      to={`/address/${row.to}`}
                      className="block-selector"
                      variant="contained"
                      color="primary"
                    >
                      {`${row.to.slice(0, 5)}...${row.to.slice(row.to.length - 3, row.to)}`}
                    </Button>
                  </div>                  
                </div>
              </StyledTableCell>
              <StyledTableCell align="right">{row.value / 1000000000000000000} ether</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
