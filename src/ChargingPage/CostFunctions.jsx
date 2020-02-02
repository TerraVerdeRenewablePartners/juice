import React from 'react';
import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import LinearProgress from '@material-ui/core/LinearProgress';
import Rating from '@material-ui/lab/Rating';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import LeafIcon from './LeafIcon';


const tooltipText = `
  The clean energy rating refers to the amount of renewable energy that will be used to charge
  your vehicle. A rating of 5 leaves means 100% of the electricity to charge your vehicle is coming
  from renewable energy. A rating of 0 leaves means none of the electricity to charge your vehicle
  is coming from renewable energy. (edited)
`;

/** ============================ Styles ==================================== */
const useStyles = makeStyles((theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }),
);

const iconStyles = {
  iconFilled: {
    color: green[300]
  }
};

/** ============================ Components ================================ */
const StyledRating = withStyles(iconStyles)(Rating);

function CostFunctions ({ prices, scheduledEnd }) {
  const classes = useStyles();
  
  if (!prices) {
    return (
      <div>
        <Typography variant="h6">Loading costs...</Typography>
        <LinearProgress />
      </div>
    )
  }
  
  const { baseline } = prices;
  const priceForSchedule = prices[scheduledEnd];
  const fullCost = priceForSchedule.total;
  
  return (
    <div className={classes.wrapper}>
      <div>
        <Typography variant="h4">${fullCost.toFixed(2)}</Typography>
        <div>Savings: ${(baseline - fullCost).toFixed(2)}</div>
      </div>
      
      <div>
        <div>
          <Tooltip title={tooltipText} placement="top">
            <Typography variant="subtitle1">Clean Energy Rating</Typography>
          </Tooltip>
        </div>
        <StyledRating
          readOnly
          value={Math.ceil(priceForSchedule.ghg)}
          icon={<LeafIcon fontSize="inherit" viewBox="0 0 350 335" />}
        />
      </div>
    </div>
  );
}

/** ============================ Exports =================================== */
export default CostFunctions;
