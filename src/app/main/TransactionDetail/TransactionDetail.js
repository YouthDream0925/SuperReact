import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import "./TransactionDetail.css";
import api from "../../../utils/api.js";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import FuseLoading from "@fuse/core/FuseLoading";
import CustomParams from "./components/CustomParams";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

const formatDate = (unix_timestamp) => {
  var date = new Date(unix_timestamp * 1000);
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-") +
    " " +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(":")
  );
};

export default function TransactionDetail(props) {
  const classes = useStyles();
  const txhash = props.match.params.transactionId;
  const [isDecode, setDecode] = useState(false);
  const [txDetail, setTxDetail] = useState({
    gasLimitAndUsage: {},
    gasFees: {},
    otherType: {},
    burntFeeAndSavingFee: {},
  });
  const [isLoaded, setIsLoaded] = useState(0);

  function handleInputData(value) {
    setDecode(!value);
  }

  useEffect(async () => {
    const responseData = (await api.get(`/getTransaction/${txhash}`));
    const tx = responseData.data;
    if(tx.message !== undefined) {
      console.log(responseData);
      setIsLoaded(2);
    } else {
      setTxDetail(tx);
      setIsLoaded(1);
    }
  }, []);

  return (
    <>
      {
        isLoaded == 0 ?
        <></>
        :
        <div className="page-header d-flex">
          <strong>Transaction Details</strong>
        </div>
      }
      {isLoaded == 1 ? (
        <div className="page-body">
          <div className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem>
                <div className="item-box">
                  <Icon className="mr-1">help_outline</Icon>
                  Transaction Hash:
                </div>
                <div className="space"></div>
                <div className="item-box">{txhash}</div>
              </ListItem>
              <ListItem>
                <div className="item-box">
                  <Icon className="mr-1">help_outline</Icon>
                  Status:
                </div>
                <div className="space"></div>
                <div className="item-box">
                  <IconButton className="w-10 h-10">
                    <Icon className="icon-font-size">alarm_on</Icon>
                  </IconButton>
                  Success
                </div>
              </ListItem>
              <ListItem>
                <div className="item-box">
                  <Icon className="mr-1">help_outline</Icon>
                  Block:
                </div>
                <div className="space"></div>
                <div className="item-box">
                  <IconButton className="w-10 h-10">
                    <Icon className="icon-font-size">schedule</Icon>
                  </IconButton>
                  <Button
                    style={{ color: "#5395c9", marginLeft: "0.5rem", justifyContent: 'start' }}
                    component={Link}
                    to={`/blocks/${txDetail.block}`}
                    className="block-selector"
                    variant="contained"
                    color="primary"
                  >
                    {txDetail.block}
                  </Button>
                  {Math.floor(txDetail.block / 32)} Block Confirmation
                </div>
              </ListItem>
              <ListItem>
                <div className="item-box">
                  <Icon className="mr-1">help_outline</Icon>
                  Timestamp:
                </div>
                <div className="space"></div>
                <div className="item-box">
                  <IconButton className="w-10 h-10">
                    <Icon className="icon-font-size">schedule</Icon>
                  </IconButton>
                  {formatDate(txDetail.timestamp)}
                </div>
              </ListItem>
            </List>
            <Divider />
            <List component="nav" aria-label="main mailbox folders">
              <ListItem>
                <div className="item-box">
                  <Icon className="mr-1">help_outline</Icon>
                  From:
                </div>
                <div className="space"></div>
                <Button
                  style={{ color: "#5395c9", marginLeft: "0.5rem" }}
                  component={Link}
                  to={`/address/${txDetail.from}`}
                  className="block-selector"
                  variant="contained"
                  color="primary"
                >
                  {txDetail.from}
                </Button>
              </ListItem>
              <ListItem>
                <div className="item-box">
                  <Icon className="mr-1">help_outline</Icon>
                  To:
                </div>
                <div className="space"></div>
                <Button
                  style={{ color: "#5395c9", marginLeft: "0.5rem" }}
                  component={Link}
                  to={`/address/${txDetail.to}`}
                  className="block-selector"
                  variant="contained"
                  color="primary"
                >
                  {txDetail.to}
                </Button>
              </ListItem>
            </List>
            <Divider />
            <List component="nav" aria-label="main mailbox folders">
              <ListItem>
                <div className="item-box">
                  <Icon className="mr-1">help_outline</Icon>
                  Value:
                </div>
                <div className="space"></div>
                <div className="item-box">{txDetail.value} wei</div>
              </ListItem>
              <ListItem>
                <div className="item-box">
                  <Icon className="mr-1">help_outline</Icon>
                  Transaction Fee:
                </div>
                <div className="space"></div>
                <div className="item-box">
                  {txDetail.transactionFee / 1000000000000000000} ETH
                </div>
              </ListItem>
              <ListItem>
                <div className="item-box">
                  <Icon className="mr-1">help_outline</Icon>
                  Gas Price:
                </div>
                <div className="space"></div>
                <div className="item-box">
                  {txDetail.gasPrice / 1000000000} Gwei
                </div>
              </ListItem>
            </List>
            <Divider />
            <List component="nav" aria-label="main mailbox folders">
              <ListItem>
                <div className="item-box">
                  <Icon className="mr-1">help_outline</Icon>
                  Gas Limit & Usage by Txn:
                </div>
                <div className="space"></div>
                <div className="item-box">
                  {txDetail.gasLimitAndUsage.gasLimit} |{" "}
                  {txDetail.gasLimitAndUsage.gasUsed} (
                  {(txDetail.gasLimitAndUsage.gasUsed /
                    txDetail.gasLimitAndUsage.gasLimit) *
                    100}
                  %)
                </div>
              </ListItem>
              <ListItem>
                <div className="item-box">
                  <Icon className="mr-1">help_outline</Icon>
                  Gas Fees:
                </div>
                <div className="space"></div>
                <div className="item-box">
                  Base: {txDetail.gasFees.base} wei | Max:{" "}
                  {txDetail.gasFees.Max / 1000000000} Gwei | Max Priority:{" "}
                  {txDetail.gasFees.MaxPriority / 1000000000} Gwei
                </div>
              </ListItem>
              <ListItem>
                <div className="item-box">
                  <Icon className="mr-1">help_outline</Icon>
                  Burnt & Txn Savings Fees:
                </div>
                <div className="space"></div>
                <div className="item-box">
                  Burnt: {txDetail.burntFeeAndSavingFee.burnt / 1000000000}{" "}
                  Gwei, Txn Savings:{" "}
                  {txDetail.burntFeeAndSavingFee.saving / 1000000000} Gwei
                </div>
              </ListItem>
            </List>
            <Divider />
            <List component="nav" aria-label="main mailbox folders">
              <ListItem>
                <div className="item-box">
                  <Icon className="mr-1">help_outline</Icon>
                  Other Attributes:
                </div>
                <div className="space"></div>
                <div className="item-box">
                  Txn Type: {txDetail.otherType.txnType} (BP-1559), Nonce:{" "}
                  {parseInt(txDetail.otherType.nonce)}, Position in Block:{" "}
                  {txDetail.otherType.position}
                </div>
              </ListItem>
              <ListItem>
                <div className="item-box">
                  <Icon className="mr-1">help_outline</Icon>
                  <Button style={{color: '#5395c9', marginLeft: '0.5rem'}}
                    component={Link}
                    className="block-selector"
                    variant="contained"
                    color="primary"
                    onClick={() => handleInputData(isDecode)}
                  >
                    {
                      isDecode == false ?
                        <span>Input Data: </span>
                      :
                        <span>Decode Data: </span>
                    }
                  </Button>
                </div>
                <div className="space"></div>
                {
                  isDecode == false ?
                  <textarea
                    style={{background: 'black', width: '100%'}}
                    className="w-100 h-100"
                    rows={4}
                    value={txDetail.inputData} disabled></textarea>
                  : txDetail.decodedResult !== undefined ?
                  <div style={{background: 'black', width: '100%'}}>
                    <p style={{ padding: '1rem'}}><strong>Function:</strong> {txDetail.decodedResult.name}</p>
                    <CustomParams params = {txDetail.decodedResult.params} />
                  </div>
                  :
                  <></>
                }
                
              </ListItem>
              {/* <ListItem>
                <div className="item-box">More Details:</div>
                <div className="space"></div>
                <div className="item-box">
                  <Icon className="mr-1">horizontal_rule</Icon>
                  Click to show less
                </div>
              </ListItem> */}
            </List>
          </div>
        </div>
      ) : isLoaded == 2 ? 
        <div className="page-body">
            <Button className="item-box"
                component={Link}
                to={`/explorer`}
            >
                <strong>Invalid transaction hash!</strong>
            </Button>
        </div>
      :(
        <FuseLoading />
      )}
    </>
  );
}
