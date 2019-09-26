import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { purple } from '../utils/colors';

const styles = StyleSheet.create({
  reset: {
    textAlign: 'center',
    color: purple,
  },
});

class TextButton extends React.Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    style: PropTypes.object,
    text: PropTypes.string.isRequired,
  };

  render = () => (
    <TouchableOpacity onPress={this.props.onPress}>
      <Text style={[styles.reset, this.props.style]}>{this.props.text}</Text>
    </TouchableOpacity>
  );
}

export default TextButton;
