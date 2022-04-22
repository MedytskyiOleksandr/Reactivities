import React from 'react';
import {StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Activity} from '../../models/activity';
import * as navigation from '../../navigation/Navigation';

import ActivityItem from './ActivityItem';

interface Props {
  activities: Activity[];
  isRefreshing: boolean;
  onRefresh: () => Promise<void>;
}

function ActivityList({activities, isRefreshing, onRefresh}: Props) {
  function selectedPlaceHandler(activity: Activity) {
    navigation.navigate('ActivityDetail', {activity});
  }

  return (
    <FlatList
      onRefresh={onRefresh}
      refreshing={isRefreshing}
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
