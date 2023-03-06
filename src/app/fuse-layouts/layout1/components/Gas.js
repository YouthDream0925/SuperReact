import { memo } from 'react';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';

function Gas() {
  return (
    <>
        <div className="gas">
            <IconButton className="w-40 h-40">
                <Icon>local_gas_station</Icon>
            </IconButton>
            <div>
                Gas: <strong style={{color: '#5395c9'}}>49 Gwei</strong>
            </div>
        </div>
    </>
  );
}

export default memo(Gas);