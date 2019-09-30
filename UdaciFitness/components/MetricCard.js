import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import { getMetricMetaInfo } from '../utils/helpers';
import { gray } from '../utils/colors';
import DateHeader from './DateHeader';

const styles = StyleSheet.create({
  metric: {
    flexDirection: 'row',
    marginTop: 12,
  },
});

class MetricCard extends React.Component {
  static propTypes = {
    date: PropTypes.string,
    metrics: PropTypes.object,
  };

  render = () => (
    <View>
      {this.props.date && <DateHeader date={this.props.date} />}
      {Object.keys(this.props.metrics).map(metric => {
        const { getIcon, displayName, unit } = getMetricMetaInfo(metric);
        return (
          <View style={styles.metric} key={metric}>
            {getIcon()}
            <View>
              <Text style={{ fontSize: 20 }}>{displayName}</Text>
              <Text style={{ fontSize: 16, color: gray }}>
                {this.props.metrics[metric]} {unit}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

export default MetricCard;
