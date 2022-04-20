import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {navigationRef} from './Navigation';
import Activities from '../screens/Activities';
import ActivityDetails from '../screens/ActivityDetails';

type RootStackParamList = {
  Activities: undefined;
  ActivityDetail: {id: string; title: string};
};

const Stack = createStackNavigator<RootStackParamList>();

function ActivitiesNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="Activities" component={Activities} />
        <Stack.Screen
          name="ActivityDetail"
          component={ActivityDetails}
          options={({route}) => ({title: route.params.title})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ActivitiesNavigator;
