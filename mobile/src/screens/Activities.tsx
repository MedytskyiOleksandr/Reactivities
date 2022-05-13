import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import ActivityList from '../components/activtities/ActivityList';
import {Colors} from '../constants/Colors';
import {useAppDispatch, useAppSelector} from '../redux/store/store';
import {fetchActivities} from '../redux/slices/ActionCreators';

function Activities() {
  const {isLoading, error} = useAppSelector(state => state.activityReducer);
  const dispatch = useAppDispatch();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      dispatch(fetchActivities());
    }
  }, [dispatch, isFocused]);

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <ActivityIndicator
        color={Colors.accent500}
        size="large"
        style={styles.indicator}
      />
    );
  }

  return <ActivityList />;
}

export default Activities;

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
