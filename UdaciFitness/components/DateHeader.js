import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

class DateHeader extends React.Component {
  static propTypes = {
    date: PropTypes.string.isRequired,
  };

  render = () => <Text>{this.props.date}</Text>;
}

export default DateHeader;
