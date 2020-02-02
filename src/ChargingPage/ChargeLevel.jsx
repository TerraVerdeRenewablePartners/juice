import React, { useState } from 'react';
import range from 'lodash/range';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import { getItem } from '../localStorage';


/** ============================ Styles ==================================== */
const useStyles = makeStyles((theme) =>
  createStyles({
    input: {
      margin: `0 ${theme.spacing(2)}px`,
      width: 50
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    wrapper: {
      display: 'flex'
    }
  }),
);

/** ============================ Components ================================ */
function ChargeLevel ({ currentMileage, desiredMileage, setDesiredMileage }) {
  const classes = useStyles();
  const totalMileage = Number(getItem.capacity());
  const [error, setError] = useState(false);
  
  return (
    <div>
      <Typography id="charge-level-slider" gutterBottom>
        Choose charge level
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={desiredMileage || currentMileage}
            onChange={handleSliderChange}
            aria-labelledby="charge-level-slider"
            valueLabelDisplay="auto"
            step={Math.round(totalMileage / 10)}
            marks={makeMarks()}
            min={0}
            max={totalMileage}
          />
        </Grid>

        <Grid item>
          <Input
            className={classes.input}
            error={error}
            value={desiredMileage || currentMileage}
            margin="dense"
            onChange={handleInputChange}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
  
  function handleSliderChange (event, newValue) {
    setDesiredMileage(newValue);
  }
  
  function handleInputChange (event) {
    const strValue = event.target.value;
    if (strValue === '') {
      setDesiredMileage('');
      return;
    }
    
    const value = Number(strValue);
    setError(value < currentMileage);
    setDesiredMileage(value);
  }
  
  /**
   * Constructs the marks for the slider. We want to render labels for the min and max, but not
   * in between
   */
  function makeMarks () {
    const numMarks = 11;
    const mileageInterval = totalMileage / 10;
    return range(0, numMarks).map((index) => {
      const value = Math.floor(mileageInterval * index);
      if (index === 0 || index === numMarks - 1) {
        return {
          value,
          label: value
        };
      }
      
      return {
        value
      };
    });
  }
}

/** ============================ Exports =================================== */
export default ChargeLevel;
