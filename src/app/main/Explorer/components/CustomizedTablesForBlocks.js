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

function createData(block, timeStamp, blockHash, transactions, reward) {
  return { block, timeStamp, blockHash, transactions, reward };
}

const useStyles = makeStyles({
  table: {
    minWidth: '100%',
  },
});

export default function CustomizedTablesForBlocks(props) {
  const classes = useStyles();

  const [rows, setRows] = useState([]);

  useEffect(async () => {
    const blks = props.blocks;
    let rowsTemp = [];
    for(let i = 0 ; i < blks.length; ++ i) {
      rowsTemp.push(createData(blks[i].blockNumber, Math.floor(new Date().getTime() / 1000) - blks[i].timestamp, blks[i].blockHash, blks[i].transactions, blks[i].blockReward));
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
                  <div className='emoticon-container'>
                      <img
                          src="assets/icons/custom-pngs/block.png"
                          alt="aasdfa"
                      />
                  </div>
                  <div style={{ marginLeft: '1rem' }}>
                    <Button
                        component={Link}
                        to={`/blocks/${row.block}`}
                        className="block-selector"
                        style={{justifyContent: 'start'}}
                        variant="contained"
                        color="primary"
                        >
                        <span className="hidden sm:flex font-16">{row.block}</span>
                    </Button>
                    <p className='font-11'>{row.timeStamp}s ago</p> 
                  </div>
                </div>
              </StyledTableCell>
              <StyledTableCell align="left">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center'}}>
                    <p>Block Hash:</p>
                    <Button
                      component={Link}
                      to={`/blocks/${row.block}`}
                      className="block-selector"
                      variant="contained"
                      color="primary"
                      style={{color: '#5395c9', marginLeft: '0.5rem'}}
                    >
                      {`${row.blockHash.slice(0, 5)}...${row.blockHash.slice(row.blockHash.length - 3, row.blockHash)}`}
                    </Button>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center'}}>
                    <Button style={{color: '#5395c9', marginRight: '0.5rem'}}
                      component={Link}
                      to={`/explorer`}
                      className="block-selector"
                      variant="contained"
                      color="primary"
                    >
                      {row.transactions}
                    </Button>
                    <span>txns in 3 secs</span>
                  </div>                  
                </div>
              </StyledTableCell>
              <StyledTableCell align="right">{row.reward / 1000000000} gwei</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
