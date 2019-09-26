import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Slider, StyleSheet } from 'react-native';
import { gray } from '../utils/colors';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  metricCounter: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class UdaciSlider extends React.Component {
  static propTypes = {
    max: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
    step: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  render = () => (
    <View style={styles.row}>
      <Slider
        style={{ flex: 1 }}
        step={this.props.step}
        value={this.props.value}
        maximumValue={this.props.max}
        minimumValue={0}
        onValueChange={this.props.onChange}
      />
      <View style={styles.metricCounter}>
        <Text style={{ fontSize: 24, textAlign: 'center' }}>
          {this.props.value}
        </Text>
        <Text style={{ fontSize: 18, color: gray }}>{this.props.unit}</Text>
      </View>
    </View>
  );
}

export default UdaciSlider;
