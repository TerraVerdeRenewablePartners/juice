import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';


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
  
  return (
    <div>
      {prices[scheduledEnd].total.toFixed(2)}
    </div>
  );
}

/** ============================ Exports =================================== */
export default CostFunctions;
