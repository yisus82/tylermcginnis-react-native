import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

class EntryDetail extends Component {
  static propTypes = {
    navigation: PropTypes.object,
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
