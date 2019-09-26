import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { purple } from '../utils/colors';

class DateHeader extends React.Component {
  static propTypes = {
    date: PropTypes.string.isRequired,
  };

  render = () => (
    <Text style={{ color: purple, fontSize: 25 }}>{this.props.date}</Text>
  );
}

export default DateHeader;
