import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

class UdaciSteppers extends React.Component {
  static propTypes = {
    unit: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired,
  };

  render = () => (
    <View>
      <View>
        <TouchableOpacity onPress={this.props.onDecrement}>
          <FontAwesome name="minus" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.onIncrement}>
          <FontAwesome name="plus" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        <Text>{this.props.value}</Text>
        <Text>{this.props.unit}</Text>
      </View>
    </View>
  );
}
export default UdaciSteppers;
