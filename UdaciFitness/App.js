import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import AddEntry from './components/AddEntry';
import reducer from './reducers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <View style={styles.container}>
        <AddEntry />
      </View>
    </Provider>
  );
}
