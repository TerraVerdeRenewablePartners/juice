import React from 'react';
import moment from 'moment';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';


/** ============================ Components ================================ */
function Scheduling ({ atWork, minChargeLength, schedule, setSchedule }) {
  return (
    <div>
      <Typography id="charge-level-slider" gutterBottom>
        Set charging schedule
      </Typography>
      
      <Slider
        value={schedule}
        onChange={handleSliderChange}
        aria-labelledby="charge-level-slider"
        valueLabelDisplay="auto"
        valueLabelFormat={renderLabel}
        step={1}
        marks={getMarks()}
        min={0}
        max={24}
      />
    </div>
  );
  
  function handleSliderChange (event, newSchedule) {
    // Validate that the interval is still larger than the minimum charge time
    const [newStart, newEnd] = newSchedule;
    if (newEnd - newStart < minChargeLength) {
      return;
    }
    
    // If we're configuring the work schedule, both values must move
    if (atWork) {
      const [oldStart, oldEnd] = schedule;
      const startChanged = oldStart !== newStart;
      const change = startChanged
        ? newStart - oldStart
        : newEnd - oldEnd;

      setSchedule([
        startChanged ? newStart : oldStart + change,
        startChanged ? oldEnd + change : newEnd,
      ]);
    } else {
      setSchedule(newSchedule);
    }
  }
  
  function getMarks () {
    return [
      {
        value: 0,
        label: 'Now'
      },
      {
        value: 24,
        label: '24 hrs'
      }
    ]
  }
  
  function renderLabel (value) {
    if (value === 0) return 'Now';
    return moment().add(value, 'hours').format('h:mm');
  }
}

/** ============================ Exports =================================== */
export default Scheduling;
