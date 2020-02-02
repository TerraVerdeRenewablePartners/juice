import React, { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';


/** ============================ Styles ==================================== */
const useStyles = makeStyles((theme) =>
  createStyles({
    input: {
      margin: `0 ${theme.spacing(2)}px`,
      width: 50
    },
    wrapper: {
      display: 'flex'
    }
  }),
);

/** ============================ Components ================================ */
const MileageLabel = props => <Typography variant="h6">{props.children}</Typography>;
function CurrentMileage ({ mileage, setMileage }) {
  const classes = useStyles();
  const [errorState, setErrorState] = useState(null);
  
  return (
    <div className={classes.wrapper}>
      <MileageLabel>Current charge:</MileageLabel>
      <TextField
        className={classes.input}
        error={!!errorState}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={updateMileage}
        type="number"
        value={mileage || ''}
      />
      <MileageLabel>miles</MileageLabel>
    </div>
  );
  
  function updateMileage (event) {
    const value = Number(event.target.value);
    setErrorState(value <= 0);
    setMileage(value);
  }
}

/** ============================ Exports =================================== */
export default CurrentMileage;
