import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

class EntryDetail extends Component {
  static propTypes = {
    navigation: PropTypes.object,
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

  render = () => (
    <View>
      <Text>
        Entry Detail -
        {JSON.stringify(this.props.navigation.state.params.entryId)}
      </Text>
    </View>
  );
}

export default EntryDetail;
