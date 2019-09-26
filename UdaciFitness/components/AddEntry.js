import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { addEntry } from '../actions';
import {
  getMetricMetaInfo,
  timeToString,
  getDailyReminderValue,
} from '../utils/helpers';
import { submitEntry, removeEntry } from '../utils/api';
import { purple, white } from '../utils/colors';
import UdaciSlider from './UdaciSlider';
import UdaciSteppers from './UdaciSteppers';
import DateHeader from './DateHeader';
import TextButton from './TextButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
});

class AddEntry extends React.Component {
  static propTypes = {
    alreadyLogged: PropTypes.bool,
    dispatch: PropTypes.func,
  };

  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  };

  /**
   * Increments a metric
   * @param {string} metric Metric to increment
   */
  increment = metric => {
    const { max, step } = getMetricMetaInfo(metric);

    this.setState(state => ({
      [metric]: Math.min(state[metric] + step, max),
    }));
  };

  /**
   * Decrements a metric
   * @param {string} metric Metric to decrement
   */
  decrement = metric =>
    this.setState(state => ({
      [metric]: Math.max(state[metric] - getMetricMetaInfo(metric).step, 0),
    }));

  /**
   * Changes a metric value through a slider
   * @param {string} metric
   * @param {number} value
   */
  slide = (metric, value) =>
    this.setState(() => ({
      [metric]: value,
    }));

  /**
   * Handle submit button
   */
  submit = () => {
    const key = timeToString();
    const entry = this.state;

    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    }));

    // Update Redux
    this.props.dispatch(
      addEntry({
        [key]: entry,
      })
    );

    // Navigate to home

    // Save to "DB"
    submitEntry(key, entry);

    // Clear local notification
  };

  /**
   * Handles reset button
   */
  reset = () => {
    const key = timeToString();

    // Update Redux
    this.props.dispatch(
      addEntry({
        [key]: getDailyReminderValue(),
      })
    );

    // Route to Home

    // Update "DB"
    removeEntry(key);
  };

  render = () => {
    const metaInfo = getMetricMetaInfo();

    if (this.props.alreadyLogged) {
      return (
        <View style={styles.center}>
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-happy' : 'md-happy'}
            size={100}
          />
          <Text>You already logged your information for today.</Text>
          <TextButton
            style={{ padding: 10 }}
            onPress={this.reset}
            text="Reset"
          />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <DateHeader date={new Date().toLocaleDateString()} />
        {Object.keys(metaInfo).map(key => {
          const { getIcon, type, ...rest } = metaInfo[key];
          const value = this.state[key];

          return (
            <View key={key} style={styles.row}>
              {getIcon()}
              {type === 'slider' ? (
                <UdaciSlider
                  value={value}
                  onChange={newValue => this.slide(key, newValue)}
                  {...rest}
                />
              ) : (
                <UdaciSteppers
                  value={value}
                  onIncrement={() => this.increment(key)}
                  onDecrement={() => this.decrement(key)}
                  {...rest}
                />
              )}
            </View>
          );
        })}
        <TouchableOpacity
          style={
            Platform.OS === 'ios'
              ? styles.iosSubmitBtn
              : styles.AndroidSubmitBtn
          }
          onPress={this.submit}
        >
          <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  };
}

/**
 * Maps state to props
 * @param {object} state App state
 */
const mapStateToProps = state => {
  const key = timeToString();

  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined',
  };
};

export default connect(mapStateToProps)(AddEntry);
