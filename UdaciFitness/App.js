import React from 'react';
import { View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import entriesReducer from './reducers';
import AddEntry from './components/AddEntry';
import History from './components/History';

export default function App() {
  return (
    <Provider store={createStore(entriesReducer)}>
      <View style={{ flex: 1 }}>
        <AddEntry />
        <History />
      </View>
    </Provider>
  );
}
