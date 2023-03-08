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

export default function CustomizedTablesForTransactions() {
  const classes = useStyles();

  const [rows, setRows] = useState([]);

  useEffect(async () => {
    const res = await api.get(`/latestTransactions`);
    const blks = res.data;
    console.log(blks);
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
                    <p style={{color: '#5395c9'}}>{row.hash.slice(0,15)}...</p> 
                    <p>{row.timeStamp}s ago</p> 
                  </div>
                </div>
              </StyledTableCell>
              <StyledTableCell align="left">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center'}}>
                    <p style={{ marginRight: '0.5rem'}}>From </p><span style={{color: '#5395c9'}}>{`${row.from.slice(0, 5)}...${row.from.slice(row.from.length - 3, row.from)}`}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center'}}>
                    <p style={{marginRight: '0.5rem'}}>To</p><span style={{color: '#5395c9', marginLeft: '0.5rem'}}>{`${row.to.slice(0, 5)}...${row.to.slice(row.to.length - 3, row.to)}`}</span>
                  </div>                  
                </div>
              </StyledTableCell>
              <StyledTableCell align="right">{row.value} wei</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
