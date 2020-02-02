
export const MILES_PER_KWH = 3.5;
export const CHARGE_RATE_KW = 5.7;

export const getSchedulingPrices = async (additionalMiles) => {
  const resp = await fetch(`http://localhost:8000/get-hours/?miles_choice=${additionalMiles}`)
  return resp.json();
};

export const getMinimumChargeLength = (currentMileage, desiredMileage) => {
  const chargingMiles = desiredMileage - currentMileage;
  return chargingMiles / MILES_PER_KWH / CHARGE_RATE_KW;
};
