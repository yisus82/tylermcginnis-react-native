import React from 'react';
import { View, Text } from 'react-native';
import { getMetricMetaInfo } from '../utils/helpers';

const AddEntry = () => (
  <View>
    <Text>{getMetricMetaInfo('bike').getIcon()}</Text>
  </View>
);

export default AddEntry;
