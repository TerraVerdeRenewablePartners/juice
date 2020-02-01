import React, { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';


/** ============================ Styles ==================================== */
const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      margin: 'auto',
      width: 300
    },
    textField: {
      marginBottom: theme.spacing(2)
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
              label="SAID"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleSaIdChange}
              value={saId}
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
