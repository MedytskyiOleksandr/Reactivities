/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';

import ActivitiesNavigator from './src/navigation/ActivityNavigator';
import store from './src/redux/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <ActivitiesNavigator />
    </Provider>
  );
};

export default App;
