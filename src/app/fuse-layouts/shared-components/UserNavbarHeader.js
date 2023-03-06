import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { logoutUser } from 'app/auth/store/userSlice';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '&.user': {
      '& .username, & .email': {
        transition: theme.transitions.create('opacity', {
          duration: theme.transitions.duration.shortest,
          easing: theme.transitions.easing.easeInOut,
        }),
      },
    },
  },
  avatar: {
    background: theme.palette.background.default,
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
    bottom: 0,
    '& > img': {
      borderRadius: '50%',
    },
  },
}));

function UserNavbarHeader(props) {
  const user = useSelector(({ auth }) => auth.user);
  const classes = useStyles();   

  const dispatch = useDispatch();
  return (
    <AppBar
    position="static"
    color="primary"
    classes={{ root: classes.root }}
    className="user relative flex flex-col pl-20 pt-50 pb-8 mb-32 z-0 shadow-0"
  >
    <div className="flex flex-row">
      <Avatar
        className={clsx(classes.avatar, 'avatar w-72 h-72 p-8 box-content')}
        alt="user photo"
        src={
          user.avatar && user.avatar !== ''
            ? user.avatar
            : 'assets/images/avatars/profile.jpg'
        }
      />
      <div className="flex flex-col justify-center">
        <Typography className="username text-18 whitespace-nowrap font-semibold mb-4 pl-20" color="inherit">
          {user.name}
        </Typography>     
        <Typography className="email text-10 opacity-50 whitespace-nowrap font-medium pl-20" color="inherit">
          {user.email}
        </Typography>   
        {/* <Link
          color="inherit"
          to="/logout"
          style={{width:"100%",textAlign:"right", marginTop:"10px",marginRight:"10px"}}
          role="button"
        > */}
        <div style={{width:"100%",textAlign:"right", marginTop:"10px",marginRight:"10px"}}>
          <Button onClick={() => {dispatch(logoutUser());}}  role='button' style={{ paddingLeft:"20px", paddingRight:"20px"}}>
              <i className="fa-solid fa-right-from-bracket"></i>&nbsp;&nbsp;Logout
          </Button>
        </div>
          
          
        {/* </Link> */}
      </div>
    </div>
   
    
    
    
  </AppBar>
  );
}

export default UserNavbarHeader;
