import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
import Constants from 'expo-constants';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import entriesReducer from './reducers';
import AddEntry from './components/AddEntry';
import History from './components/History';
import { white, purple } from './utils/colors';

const Tabs = {
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: 'History',
      /**
       * @param {{ tintColor: string; }} options Tab bar icon options
       */
      tabBarIcon(options) {
        return (
          <Ionicons name="ios-bookmarks" size={30} color={options.tintColor} />
        );
      },
    },
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: 'Add Entry',

      /**
       * @param {{ tintColor: string; }} options Tab bar icon options
       */
      tabBarIcon(options) {
        return (
          <FontAwesome name="plus-square" size={30} color={options.tintColor} />
        );
      },
    },
  },
};

const navigationOptions = {
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    },
  },
};

const TabNav = createAppContainer(
  Platform.OS === 'ios'
    ? createBottomTabNavigator(Tabs, navigationOptions)
    : createMaterialTopTabNavigator(Tabs, navigationOptions)
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(entriesReducer)}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: purple,
              height: Constants.statusBarHeight,
            }}
          >
            <StatusBar
              translucent
              backgroundColor={purple}
              barStyle="light-content"
            />
          </View>
          <TabNav />
        </View>
      </Provider>
    );
  }
}
