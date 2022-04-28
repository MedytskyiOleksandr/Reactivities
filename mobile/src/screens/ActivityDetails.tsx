import React from 'react';
import {Image, StyleSheet, Text, ScrollView} from 'react-native';

import {Activity} from '../models/activity';
import {images} from '../assets/index';

interface Props {
  route: {
    params: {
      activity: Activity;
    };
  };
}

function ActivityDetails({route}: Props) {
  let name = route.params.activity.category;
  let path = images[name] || images.culture;

  return (
    <ScrollView>
      <Image style={styles.image} source={path} />
      <Text style={styles.date}>{route.params.activity.date}</Text>
      <Text style={styles.description}>
        {route.params.activity.description}
      </Text>
    </ScrollView>
  );
}

export default ActivityDetails;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 250,
  },
  textContainer: {
    flex: 1,
  },
  date: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginVertical: 10,
  },
  description: {
    fontSize: 18,
    color: 'white',
    marginHorizontal: 10,
  },
});
