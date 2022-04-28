import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

import {images} from '../../assets';
import {Colors} from '../../constants/Colors';
import {Activity} from '../../models/activity';

interface Props {
  activity: Activity;
  onSelect: (activity: Activity) => void;
}

function ActivityItem({activity, onSelect}: Props) {
  let name = activity.category;
  let path = images[name] || images.culture;

  return (
    <Pressable
      style={({pressed}) => [styles.item, pressed && styles.pressed]}
      onPress={() => onSelect(activity)}>
      <Image style={styles.image} source={path} />
      <View style={styles.info}>
        <Text style={styles.title}>{activity.title}</Text>
        <Text style={styles.date}>{activity.date}</Text>
      </View>
      <View style={styles.markerContainer}>
        <Text style={styles.category}>{activity.category}</Text>
      </View>
    </Pressable>
  );
}
export default ActivityItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.gray700,
  },
  date: {
    fontSize: 14,
    color: Colors.gray700,
  },
  markerContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    padding: 10,
    borderWidth: 1.5,
    borderRadius: 10,
    backgroundColor: '#af79b8',
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 2,
  },
  category: {
    fontSize: 15,
    color: Colors.gray700,
  },
});
