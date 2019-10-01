import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import { white } from '../utils/colors';
import { removeEntry } from '../utils/api';
import { addEntry } from '../actions';
import MetricCard from './MetricCard';
import TextButton from './TextButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
});

class EntryDetail extends Component {
  static propTypes = {
    metrics: PropTypes.object,
    remove: PropTypes.func,
    goBack: PropTypes.func,
    entryId: PropTypes.string,
  };

  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params;
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const year = entryId.slice(0, 4);
    const month = entryId.slice(5, 7);
    const day = entryId.slice(8);

    return {
      title: `${monthNames[month - 1]} ${day}, ${year}`,
    };
  };

  /**
   * Checks if the component should update
   * @param {{ metrics: { today: any; }; }} nextProps Updated props
   */
  shouldComponentUpdate = nextProps =>
    nextProps.metrics !== null && !nextProps.metrics.today;

  reset = () => {
    const { remove, goBack, entryId } = this.props;

    remove();
    goBack();
    removeEntry(entryId);
  };

  render = () => {
    const { metrics } = this.props;

    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics} />
        <TextButton style={{ margin: 20 }} onPress={this.reset} text="Reset" />
      </View>
    );
  };
}

/**
 * Maps state to props
 * @param {object} state State to map
 * @param {object} navigation Navigation object
 */
const mapStateToProps = (state, { navigation }) => {
  const { entryId } = navigation.state.params;

  return {
    entryId,
    metrics: state[entryId],
  };
};

/**
 * Maps state to props
 * @param {object} dispatch Dispatch to map
 * @param {object} navigation Navigation object
 */
const mapDispatchToProps = (dispatch, { navigation }) => {
  const { entryId } = navigation.state.params;

  return {
    remove: () =>
      dispatch(
        addEntry({
          [entryId]:
            timeToString() === entryId ? getDailyReminderValue() : null,
        })
      ),
    goBack: () => navigation.goBack(),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryDetail);
