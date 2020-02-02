import React from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';

import logo from './logo.png';


const useStyles = makeStyles((theme) =>
  createStyles({
    logo: {
      width: 260,
      margin: 'auto'
    },
    wrapper: {
      width: '100%',
      textAlign: 'center'
    }
  })
);

function Logo () {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <img className={classes.logo} src={logo} />
    </div>
  );
}

export default Logo;