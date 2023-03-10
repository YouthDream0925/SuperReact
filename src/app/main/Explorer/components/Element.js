import { memo } from 'react';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

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
                <Button
                    component={Link}
                    to={`${data.link}`}
                    style={{justifyContent: 'start'}}
                    className="block-selector"
                    variant="contained"
                    color="primary"
                >
                  {data.value}
                </Button>
            </div>
        </div>
    </>
  );
}

export default memo(Element);