import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {Activity} from '../../models/activity';
import * as navigation from '../../navigation/Navigation';

import ActivityItem from './ActivityItem';

interface Props {
  activities: Activity[];
}

function ActivityList({activities}: Props) {
  function selectedPlaceHandler(activity: Activity) {
    navigation.navigate('ActivityDetail', {activity});
  }

  return (
    <FlatList
      style={styles.list}
      data={activities}
      renderItem={({item}) => (
        <ActivityItem activity={item} onSelect={selectedPlaceHandler} />
      )}
    />
  );
}

export default ActivityList;

const styles = StyleSheet.create({
  list: {
    marginHorizontal: 8,
  },
});
