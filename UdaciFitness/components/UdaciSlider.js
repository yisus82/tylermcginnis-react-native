import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Slider } from 'react-native';

class UdaciSlider extends React.Component {
  static propTypes = {
    max: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
    step: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  render = () => (
    <View>
      <Slider
        step={this.props.step}
        value={this.props.value}
        maximumValue={this.props.max}
        minimumValue={0}
        onValueChange={this.props.onChange}
      />
      <View>
        <Text>{this.props.value}</Text>
        <Text>{this.props.unit}</Text>
      </View>
    </View>
  );
}

export default UdaciSlider;
