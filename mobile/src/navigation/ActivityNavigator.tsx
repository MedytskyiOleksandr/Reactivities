import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {navigate, navigationRef} from './Navigation';
import Activities from '../screens/Activities';
import ActivityDetails from '../screens/ActivityDetails';
import {Activity} from '../models/activity';
import {Colors} from '../constants/Colors';
import IconButton from '../components/UI/IconButton';
import AddActivity from '../screens/AddActivity';
import {useAppSelector} from '../redux/store/store';

type RootStackParamList = {
  Activities: undefined;
  ActivityDetail: {activity: Activity};
  AddActivity: {activity: Activity | undefined};
};

const Stack = createStackNavigator<RootStackParamList>();

function ActivitiesNavigator() {
  const {selectedActivity} = useAppSelector(state => state.activityReducer);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary500,
          },
          headerTintColor: Colors.gray700,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          cardStyle: {backgroundColor: Colors.gray700},
        }}>
        <Stack.Screen
          name="Activities"
          component={Activities}
          options={{
            headerRight: ({tintColor}) => (
              <IconButton
                icon="add-to-list"
                size={24}
                color={tintColor}
                onPress={() => navigate('AddActivity', {})}
              />
            ),
          }}
        />
        <Stack.Screen
          name="ActivityDetail"
          component={ActivityDetails}
          options={() => ({
            title: selectedActivity!.title,
            headerRight: ({tintColor}) => (
              <IconButton
                icon="edit"
                size={24}
                color={tintColor}
                onPress={() => navigate('AddActivity')}
              />
            ),
          })}
        />
        <Stack.Screen
          name="AddActivity"
          component={AddActivity}
          options={() => ({
            title: selectedActivity?.id ? 'Edit Activity' : 'Add Activity',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ActivitiesNavigator;
