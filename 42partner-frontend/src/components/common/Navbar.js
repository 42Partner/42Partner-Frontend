import React, { useState } from 'react';
import '../../styles/Navbar.scss';
import { BsPersonCircle, BsList } from 'react-icons/bs';
import {
  AppBar,
  Toolbar,
  makeStyles,
  Button,
  Typography,
  useMediaQuery,
} from '@material-ui/core/index';

import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { BiHome } from 'react-icons/bi';
import { GiMeal, GiPencil } from 'react-icons/gi';
import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getProfile } from '../../modules/mypage';

const useStyles = makeStyles(() => ({
  navbar: {
    backgroundColor: '#ffdbe0', // 'lightpink', // #f8dadc
    paddingRight: '60px',
    paddingLeft: '60px',
    height: '80px',
  },
  navbarMobile: {
    backgroundColor: '#ffdbe0',
    height: '80px',
  },
  logo: {
    fontFamily: 'Ubuntu-medium',
    fontWeight: 600,
    color: '#FFFEFE',
    textAlign: 'center',
    paddingRight: '10px',
    fontSize: '40px',
  },
  menuButton: {
    fontFamily: 'ubuntu-regular',
    fontWeight: 700,
    size: '18px',
    marginLeft: '30px',
  },
  navbarContents: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  description: {
    fontFamily: 'ubuntu-regular',
    fontSize: '15px',
  },
  button: {
    width: '40px',
    height: '40px',
  },
}));

const Navbar = () => {
  const { navbar, navbarMobile, navbarContents, logo, button } = useStyles();
  const isMobile = useMediaQuery('(max-width: 757px)');
  const [sidebar, setSidebar] = useState(false);
  //   const dispatch = useDispatch();
  //   const { user } = useSelector(({ mypage }) => ({
  //     user: mypage.user,
  //   }));
  //   useEffect(() => {
  //     dispatch(getProfile());
  //   }, []);

  const getProfileButton = () => {
    return (
      <Button>
        <BsPersonCircle className={button} />
      </Button>
    );
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setSidebar(open);
  };

  const condition1 = (index) => {
    return index === 1 ? <GiMeal /> : <GiPencil />;
  };

  const condition2 = (index) => {
    return index === 1 ? '/meal/random' : '/study/random';
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Home', 'Meal', 'Study'].map((text, index) => (
          <Link
            to={index === 0 ? '/' : condition2(index)}
            style={{ color: 'black', textDecoration: 'none' }}
            key={text}
          >
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index === 0 ? <BiHome /> : condition1(index)}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  const getMenuButton = () => {
    return (
      <div>
        <Button onClick={toggleDrawer(true)}>
          <BsList className={button} />
        </Button>
        <Drawer open={sidebar} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </div>
    );
  };

  const MainLogo = (
    <Link to="/" style={{ textDecoration: 'none' }}>
      <Typography variant="h6" component="h1" className={logo}>
        42Partner
      </Typography>
    </Link>
  );

  //   const LogoDesc = (
  //     <span className={description}>Find partner to eat and to study</span>
  //   );

  const display = () => {
    return (
      <Toolbar className={navbarContents}>
        <div>{getMenuButton()}</div>
        <div className="logo-div">{MainLogo}</div>
        <div>
          {/* {user ? ( */}
          <Link to="/mypage" style={{ color: 'white', textDecoration: 'none' }}>
            {getProfileButton()}
          </Link>
          {/* //   ) : (
        //     <Link
        //       to="/login"
        //       style={{ color: 'white', textDecoration: 'none' }}
        //     >
        //       {getProfileButton()}
        //     </Link>
        //   )} */}
        </div>
      </Toolbar>
    );
  };
  return (
    <header>
      <AppBar className={isMobile ? navbarMobile : navbar}>{display()}</AppBar>
    </header>
  );
};

export default Navbar;
