import React from 'react';
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
  
  return (
    <div className={classes.wrapper}>
      <MileageLabel>Current mileage:</MileageLabel>
      <TextField
        className={classes.input}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={updateMileage}
        type="number"
        value={mileage}
      />
      <MileageLabel>miles</MileageLabel>
    </div>
  );
  
  function updateMileage (event) {
    setMileage(Number(event.target.value));
  }
}

/** ============================ Exports =================================== */
export default CurrentMileage;
