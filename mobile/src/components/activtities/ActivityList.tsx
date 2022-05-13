import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {Colors} from '../../constants/Colors';
import {Activity} from '../../models/activity';
import {useAppSelector} from '../../redux/store/store';
import ActivityItem from './ActivityItem';

function ActivityList() {
  const {activities} = useAppSelector(state => state.activityReducer);

  const groupedActivities = Object.entries(
    activities.reduce((activitiesArray, activity) => {
      const date = activity.date.split('T')[0];
      activitiesArray[date] = activitiesArray[date]
        ? [...activitiesArray[date], activity]
        : [activity];
      return activitiesArray;
    }, {} as {[key: string]: Activity[]}),
  );

  return (
    <ScrollView>
      {groupedActivities.map(([group, activities2]) => (
        <View key={group}>
          <Text style={styles.headerText}>{group}</Text>
          {activities2.map(activity => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

export default ActivityList;

const styles = StyleSheet.create({
  headerText: {
    marginHorizontal: 8,
    marginTop: 12,
    color: Colors.primary500,
    fontSize: 20,
  },
});
