import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({ root: { flexGrow: 1 },
  menuButton: { marginRight: theme.spacing(2) },
  appBar: { background: '#1B1464',
    color: '#FA275A' },
  toolbar: { minHeight: 80,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2) },
  title: { flexGrow: 1,
    display: 'flex',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    color: '#FFFFFF' },
  logo: { marginRight: '0.75rem',
    width: '3.5rem' } }));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar} elevation={0}>
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.title} variant="h5" noWrap>
            <Link to="/" style={{ textDecoration: 'none', color: 'white', fontFamily: 'PT Sans', fontSize: '2.5rem', fontWeight: '700', paddingLeft: '4rem' }}> moveAI</Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
