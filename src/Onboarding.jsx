import React, { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';


import Logo from './Logo';
import UtilityApiLogo from './UtilityApiLogo';

/** ============================ Styles ==================================== */
const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      margin: 'auto',
      width: 300
    },
    divider: {
      margin: `${theme.spacing(2)}px 0`
    },
    textField: {
      marginBottom: theme.spacing(2)
    },
    utilityApi: {
      margin: 'auto',
      textAlign: 'center',
      width: '60%'
    },
    logoLabel: {
      marginBottom: theme.spacing(0.5)
    }
  }),
);

/** ============================ Components ================================ */
function Onboarding ({ submit }) {
  const classes = useStyles();
  const [vin, setVin] = useState('');
  const [saId, setSaId] = useState('');
  const [capacity, setCapacity] = useState(null);

  return (
    <div className="App">
      <Card className={classes.card} raised>
        <CardContent>
          <Logo />
          <div>
            <TextField
              className={classes.textField}
              fullWidth
              label="Vehicle Identification Number"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleVinChange}
              value={vin}
              variant="outlined"
            />
          </div>
          
          <div>
            <TextField
              className={classes.textField}
              fullWidth
              label="Mileage Capacity"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleCapacityChange}
              variant="outlined"
            />
          </div>
          
          <Divider className={classes.divider} />
          <div className={classes.utilityApi}>
            <div className={classes.logoLabel}>Authorize with:</div>
            <a href="https://utilityapi.com/">
              <UtilityApiLogo />
            </a>
          </div>
          <Divider className={classes.divider} />
          
          <Button color="primary" onClick={submitData} variant="contained">
            Submit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
  
  function handleVinChange (event) {
    setVin(event.target.value);
  }
  
  function handleSaIdChange (event) {
    setSaId(event.target.value);
  }
  
  function handleCapacityChange (event) {
    setCapacity(event.target.value);
  }
  
  function submitData () {
      submit({ capacity, saId, vin });
  }
}

export default Onboarding;
