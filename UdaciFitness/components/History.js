import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import UdaciFitnessCalendar from 'udacifitness-calendar';
import { receiveEntries, addEntry } from '../actions';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import { fetchCalendarResults } from '../utils/api';

class History extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    entries: PropTypes.object,
  };

  componentDidMount = () => {
    const { dispatch } = this.props;

    fetchCalendarResults()
      .then(entries => dispatch(receiveEntries(entries)))
      .then(({ entries }) => {
        if (!entries[timeToString()]) {
          dispatch(
            addEntry({
              [timeToString()]: getDailyReminderValue(),
            })
          );
        }
      });
  };

  /**
   * Renders an item
   */
  renderItem = ({ today, ...metrics }) => (
    <View>
      {today ? (
        <Text>{JSON.stringify(today)}</Text>
      ) : (
        <Text>{JSON.stringify(metrics)}</Text>
      )}
    </View>
  );

  /**
   * Renders an empty date
   */
  renderEmptyDate = () => (
    <View>
      <Text>{JSON.stringify(this.props)}</Text>
      <Text>No Data for this day</Text>
    </View>
  );

  render() {
    const { entries } = this.props;

    return (
      <UdaciFitnessCalendar
        items={entries}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
      />
    );
  }
}

/**
 * Maps state to props
 * @param {object} state App state
 */
const mapStateToProps = state => ({
  entries: state,
});

export default connect(mapStateToProps)(History);
