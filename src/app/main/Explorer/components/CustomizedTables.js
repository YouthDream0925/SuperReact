import React from 'react';
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('16763605', 'Block Hash', '0.16023 Eth'),
  createData('16763605', 'Block Hash', '0.16023 Eth'),
  createData('16763605', 'Block Hash', '0.16023 Eth'),
  createData('16763605', 'Block Hash', '0.16023 Eth'),
  createData('16763605', 'Block Hash', '0.16023 Eth'),
  createData('16763605', 'Block Hash', '0.16023 Eth'),
];

const useStyles = makeStyles({
  table: {
    minWidth: '100%',
  },
});

export default function CustomizedTables() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} style={{ borderRadius: '0'}}>
      <Table className={classes.table} aria-label="customized table">
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                <div style={{ display: 'flex', alignItems: 'center'}}>
                  <Icon>search</Icon>
                  <div style={{ marginLeft: '1rem' }}>
                    <p style={{color: '#5395c9'}}>{row.name}</p> 
                    <p>11 secs ago</p> 
                  </div>
                </div>
              </StyledTableCell>
              <StyledTableCell align="left">
                <div>
                  <p>{row.calories}</p>
                  <p style={{color: '#5395c9'}}>0xcC7...7B88</p>
                </div>
              </StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
