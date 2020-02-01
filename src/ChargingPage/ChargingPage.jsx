import React, { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import ChargingLevel from './ChargeLevel';
import CurrentMileage from './CurrentMileage';


/** ============================ Styles ==================================== */
const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      margin: 'auto',
      width: 500
    },
    root: {
      width: '100%',
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    }
  })
);

/** ============================ Components ================================ */
function ChargingPage () {
  const classes = useStyles();
  
  // State
  const [currentMileage, setMileage] = useState(getDefaultMileage());

  return (
    <div className="App">
      <Card className={classes.card} raised>
        <CardContent>
          <CurrentMileage mileage={currentMileage} setMileage={setMileage} />
          {currentMileage && <ChargingLevel currentMileage={currentMileage} />}
        </CardContent>
      </Card>
    </div>
  );
}

/** ============================ Helpers =================================== */
function getDefaultMileage () {
  // TODO: actually do something?
  return 105;
}

/** ============================ Exports =================================== */
export default ChargingPage;
