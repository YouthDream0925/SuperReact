import { memo, useState, useEffect } from 'react';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import api from "../../../../utils/api.js";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import {ethers} from "ethers";

function Gas() {
  const [gasPrice, setGasPrice] = useState(0);

  useEffect(async () => {
    const res = await api.get(`/getGasPrice`);
    setGasPrice(ethers.BigNumber.from(res.data.gasPrice).toString());
  }, [])

  return (
    <>
        <div className="gas">
            <IconButton className="w-40 h-40">
                <Icon>local_gas_station</Icon>
            </IconButton>
            <div>
                Gas:
                <Button
                    component={Link}
                    to={`/gasTracker`}
                    className="block-selector"
                    variant="contained"
                    color="primary"
                    >
                    <span className="block-selector hidden sm:flex">{gasPrice} wei</span>
                </Button>
            </div>
        </div>
    </>
  );
}

export default memo(Gas);