import React from 'react';
import {Text, View} from 'react-native';

function ActivityDetails(props: any) {
  return (
    <View>
      <Text>{props.route.params.title}</Text>
    </View>
  );
}

export default ActivityDetails;
