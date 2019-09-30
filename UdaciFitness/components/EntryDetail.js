import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import MetricCard from './MetricCard';
import { white } from '../utils/colors';

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

  render = () => {
    const { metrics } = this.props;

    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics} />
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

export default connect(mapStateToProps)(EntryDetail);
