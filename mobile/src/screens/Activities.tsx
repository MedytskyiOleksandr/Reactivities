import React, {useCallback, useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {ActivityIndicator, StyleSheet} from 'react-native';

import {Activity} from '../models/activity';
import agent from '../api/Axios';
import ActivityList from '../components/activtities/ActivityList';
import {Colors} from '../constants/Colors';

function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const isFocused = useIsFocused();

  const loadActivities = useCallback(async () => {
    setIsRefreshing(true);
    await agent.Activities.list().then(responce => {
      let activitiesArray: Activity[] = [];
      responce.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activitiesArray.push(activity);
      });
      setActivities(activitiesArray);
    });
    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (isFocused) {
      loadActivities().then(() => {
        setIsLoading(false);
      });
    }
  }, [isFocused, loadActivities]);

  if (isLoading) {
    return (
      <ActivityIndicator
        color={Colors.accent500}
        size="large"
        style={styles.indicator}
      />
    );
  }

  return (
    <ActivityList
      activities={activities}
      isRefreshing={isRefreshing}
      onRefresh={loadActivities}
    />
  );
}

export default Activities;

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
