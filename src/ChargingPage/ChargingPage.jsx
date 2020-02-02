import React, { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';


import Logo from '../Logo';
import { getMinimumChargeLength, getSchedulingPrices } from '../shared';
import ChargingLevel from './ChargeLevel';
import CurrentMileage from './CurrentMileage';
import CostFunctions from './CostFunctions';
import Scheduling from './Scheduling';


/** ============================ Styles ==================================== */
const useStyles = makeStyles((theme) =>
  createStyles({
    wrapper: {
      margin: 'auto',
      width: 500
    },
    divider: {
      margin: `${theme.spacing(2)}px 0`
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
  const [atWork, setAtWork] = useState(false);
  const [currentMileage, setMileage] = useState(getDefaultMileage());
  const [desiredMileage, setDesiredMileage] = useState(currentMileage);
  const [schedule, setSchedule] = useState(null);
  const [prices, setPrices] = useState(null);

  return (
    <div className="App">
      <div className={classes.wrapper}>
        <Card raised>
          <Logo />
          
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
                      atWork={atWork}
                      minChargeLength={getMinimumChargeLength(currentMileage, desiredMileage)}
                      schedule={schedule}
                      setSchedule={setSchedule}
                    />
                    
                    <Divider className={classes.divider} />
  
                    <CostFunctions prices={prices} scheduledEnd={schedule[1]} />
                  </>
                }
              </>
            }
          </CardContent>
        </Card>
      </div>
    </div>
  );
  
  async function updateDesiredMileage (newDesiredMileage) {
    setDesiredMileage(newDesiredMileage);
    if (newDesiredMileage < currentMileage) {
      return;
    }
    
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
  return null;
}

/** ============================ Exports =================================== */
export default ChargingPage;
