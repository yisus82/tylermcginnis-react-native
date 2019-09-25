import { AsyncStorage } from 'react-native';
import { CALENDAR_STORAGE_KEY } from './_calendar';

/**
 * Submits an entry
 * @param {string} key Entry key
 * @param {object} value Entry value
 */
export const submitEntry = (key, value) =>
  AsyncStorage.mergeItem(
    CALENDAR_STORAGE_KEY,
    JSON.stringify({
      [key]: value,
    })
  );

/**
 * Removes an entry
 * @param {string} key Entry key
 */
export const removeEntry = key =>
  AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then(results => {
    const data = JSON.parse(results);
    delete data[key];
    AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data));
  });
