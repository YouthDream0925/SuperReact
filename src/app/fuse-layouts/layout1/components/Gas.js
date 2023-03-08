import { memo, useState, useEffect } from 'react';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import api from "../../../../utils/api.js";
import {ethers} from "ethers";

function Gas() {
  const [gasPrice, setGasPrice] = useState(0);

  useEffect(async () => {
    const res = await api.get(`/getGasPrice`);
    setGasPrice(ethers.BigNumber.from(res.data.gasPrice.hex).toString());
  }, [])

  return (
    <>
        <div className="gas">
            <IconButton className="w-40 h-40">
                <Icon>local_gas_station</Icon>
            </IconButton>
            <div>
                Gas: <strong style={{color: '#5395c9'}}>{gasPrice / 1000000000} gwei</strong>
            </div>
        </div>
    </>
  );
}

export default memo(Gas);