import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
      width: '100%',
      minWidth: 275
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
});

function Tracker(props) {
    const classes = useStyles();
    const data = props.data;
    return (
        <>
            <Card className={classes.root} style={{ marginRight: '1rem' }} variant="outlined">
                <CardContent>
                    <div className='emoticon-container'>
                        <img
                            src="assets/icons/custom-svgs/reshot-icon-tongue-A9UCKEL2MR.svg"
                            alt="aasdfa"
                        />
                    </div>
                    <Typography style={{ textAlign: 'center', marginTop: '0.5rem', marginBottom: '0 !important' }} className={classes.pos} color="textSecondary">
                        {data.level}
                    </Typography>
                    <Typography style={{ textAlign: 'center' }} className={classes.title} color="textSecondary" gutterBottom>
                        <span style={{fontSize: '22px', color: `${data.color}`, fontWeight: '700'}}>{data.value}</span><span style={{fontSize: '16px', color: `${data.color}`, marginLeft: '0.25rem', fontWeight: '700'}}>{data.unit}</span>
                    </Typography>
                    <Typography style={{ textAlign: 'center', marginTop: '0.5rem' }} className={classes.pos} color="textSecondary">
                        <p>{data.stringOne}</p>
                        <p>{data.stringTwo}</p>
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}

export default memo(Tracker);