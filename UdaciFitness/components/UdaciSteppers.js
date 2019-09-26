import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  Text,
  Platform,
  StyleSheet,
} from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { purple, gray, white } from '../utils/colors';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  androidBtn: {
    margin: 5,
    backgroundColor: purple,
    padding: 10,
    borderRadius: 2,
  },
  iosBtn: {
    backgroundColor: white,
    borderColor: purple,
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    paddingLeft: 25,
    paddingRight: 25,
  },
  metricCounter: {
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class UdaciSteppers extends React.Component {
  static propTypes = {
    unit: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired,
  };

  render = () => (
    <View style={[styles.row, { justifyContent: 'space-between' }]}>
      {Platform.OS === 'ios' ? (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={[
              styles.iosBtn,
              { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
            ]}
            onPress={this.props.onDecrement}
          >
            <Entypo name="minus" size={30} color={purple} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.iosBtn,
              {
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderLeftWidth: 0,
              },
            ]}
            onPress={this.props.onIncrement}
          >
            <Entypo name="plus" size={30} color={purple} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={styles.androidBtn}
            onPress={this.props.onDecrement}
          >
            <FontAwesome name="minus" size={30} color={white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.androidBtn}
            onPress={this.props.onIncrement}
          >
            <FontAwesome name="plus" size={30} color={white} />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.metricCounter}>
        <Text style={{ fontSize: 24, textAlign: 'center' }}>
          {this.props.value}
        </Text>
        <Text style={{ fontSize: 18, color: gray }}>{this.props.unit}</Text>
      </View>
    </View>
  );
}
export default UdaciSteppers;
