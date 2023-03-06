import { memo } from 'react';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';

function UserWallet() {
  return (
    <>
        <div className="user-wallet">
            <p>0xcC7...7B88</p>
            <IconButton className="w-40 h-40">
                <Icon>copy</Icon>
            </IconButton>
        </div>
    </>
  );
}

export default memo(UserWallet);