import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {Activity} from '../../models/activity';
import * as navigation from '../../navigation/Navigation';

import ActivityItem from './ActivityItem';

interface Props {
  activities: Activity[];
}

function ActivityList({activities}: Props) {
  function selectedPlaceHandler(id: string, title: string) {
    navigation.navigate('ActivityDetail', {id, title});
  }

  return (
    <FlatList
      data={activities}
      renderItem={({item}) => (
        <ActivityItem activity={item} onSelect={selectedPlaceHandler} />
      )}
    />
  );
}

export default ActivityList;
