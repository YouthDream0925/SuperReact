import { memo } from 'react';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';

function Element(props) {
  const data = props.data;
  let ICON = null;
  if(data.icon != '') {
    ICON = <IconButton className="w-40 h-40"><Icon>{data.icon}</Icon></IconButton>;
  }
  return (
    <>
        <div className="gas">
            {ICON}
            <div>
                {data.key}
                <br/>
                <strong style={{color: '#5395c9'}}>{data.value}</strong>
            </div>
        </div>
    </>
  );
}

export default memo(Element);