import React, { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { getMinimumChargeLength, getSchedulingPrices } from '../shared';
import ChargingLevel from './ChargeLevel';
import CurrentMileage from './CurrentMileage';
import CostFunctions from './CostFunctions';
import Scheduling from './Scheduling';


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
  const [desiredMileage, setDesiredMileage] = useState(currentMileage);
  const [schedule, setSchedule] = useState(null);
  const [prices, setPrices] = useState(null);

  return (
    <div className="App">
      <Card className={classes.card} raised>
        <CardContent>
          <CurrentMileage mileage={currentMileage} setMileage={setMileage} />
          {currentMileage &&
            <>
              <ChargingLevel
                currentMileage={currentMileage}
                desiredMileage={desiredMileage}
                setDesiredMileage={updateDesiredMileage}
              />
              {desiredMileage && schedule &&
                <>
                  <Scheduling
                    minChargeLength={getMinimumChargeLength(currentMileage, desiredMileage)}
                    schedule={schedule}
                    setSchedule={setSchedule}
                  />
                  <CostFunctions prices={prices} scheduledEnd={schedule[1]} />
                </>
              }
            </>
          }
        </CardContent>
      </Card>
    </div>
  );
  
  async function updateDesiredMileage (newDesiredMileage) {
    setDesiredMileage(newDesiredMileage);
    
    // Update the default schedule
    const minChargeLength = getMinimumChargeLength(currentMileage, newDesiredMileage);
    setSchedule([0, Math.ceil(minChargeLength)]);
    
    // Query the server for prices
    setPrices(null);
    const prices = await getSchedulingPrices(newDesiredMileage - currentMileage);
    setPrices(prices);
  }
}

/** ============================ Helpers =================================== */
function getDefaultMileage () {
  // TODO: actually do something?
  return 105;
}

/** ============================ Exports =================================== */
export default ChargingPage;
