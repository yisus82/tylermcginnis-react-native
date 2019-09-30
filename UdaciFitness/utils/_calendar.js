import { AsyncStorage } from 'react-native';
import { getMetricMetaInfo, timeToString } from './helpers';

const CALENDAR_STORAGE_KEY = 'UdaciFitness:calendar';

/**
 * Gets a random number up until max (exclusive)
 * @param {number} max Maximum number (exclusive)
 */
const getRandomNumber = max => Math.floor(Math.random() * max);

/**
 * Sets dummy data and return it
 */
const setDummyData = () => {
  const { run, bike, swim, sleep, eat } = getMetricMetaInfo();

  const dummyData = {};
  const timestamp = Date.now();

  for (let i = -183; i < 0; i++) {
    const time = timestamp + i * 24 * 60 * 60 * 1000;
    const strTime = timeToString(time);
    dummyData[strTime] =
      getRandomNumber(3) % 2 === 0
        ? {
            run: getRandomNumber(run.max),
            bike: getRandomNumber(bike.max),
            swim: getRandomNumber(swim.max),
            sleep: getRandomNumber(sleep.max),
            eat: getRandomNumber(eat.max),
          }
        : null;
  }

  AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(dummyData));

  return dummyData;
};

/**
 * Sets the missing dates
 * @param {{ [strTime: string]: any; }} dates
 */
const setMissingDates = dates => {
  const timestamp = Date.now();

  for (let i = -183; i < 0; i++) {
    const time = timestamp + i * 24 * 60 * 60 * 1000;
    const strTime = timeToString(time);

    if (typeof dates[strTime] === 'undefined') {
      dates[strTime] = null;
    }
  }

  return dates;
};

/**
 * Returns the calendar results formatted
 * @param {string} results Results in JSON format
 */
const formatCalendarResults = results =>
  results ? setMissingDates(JSON.parse(results)) : setDummyData();

export { CALENDAR_STORAGE_KEY, formatCalendarResults };
